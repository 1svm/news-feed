import { useState, useEffect } from "react";
import { Link, useFetcher } from "@remix-run/react";
import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { NewsService } from "~/services";

import { Text, Button, Card } from "~/components/ui";
import { Stack } from "~/components/layouts";
import FeedsVideoPath from "~/assets/videos/feeds.mp4";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const newsService = new NewsService({
  theGuardianApiKey:
    process.env.THE_GUARDIAN_API_KEY ?? "19530c7c-1e9e-4870-98e0-748d4dcecc63",
  newYorkTimesApiKey:
    process.env.NEW_YORK_TIMES_API_KEY ?? "lsQGodDgAribsRZjGHJ4ifaF2xjCkXo9",
  newsApiKey: process.env.NEWS_API_KEY ?? "8a844bb3e98a4a0a8078039fc8ff8073",
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlObject = new URL(request.url);
  const source = urlObject.searchParams.get("source");
  let category = urlObject.searchParams.get("category");
  if (category === "null") category = null;
  if (!(source || category)) return null;

  return json(await newsService.fetchNews(request.url));
};

export default function Index() {
  const fetcher = useFetcher();
  const [personalization, setPersonalization] = useState({
    active: false,
    query: {},
  });

  useEffect(() => {
    const source = localStorage.getItem("source");
    const category = localStorage.getItem("category");
    setPersonalization({
      active: Boolean(source) || Boolean(category),
      query: { source, category },
    });
  }, []);

  useEffect(() => {
    if (Boolean(personalization.active)) {
      fetcher.load(`/?index&${new URLSearchParams(personalization.query)}`);
    }
  }, [personalization.active]);

  return (
    <fetcher.Form>
      {personalization.active ? (
        <Stack gap="large">
          {Array.isArray(fetcher.data)
            ? fetcher.data.map((result: any) => (
                <Card key={result.title + result.age + result.source}>
                  <Card.Thumbnail
                    src={result.thumbnail}
                    alt="Thumbnail Description"
                  />
                  <Card.Content>
                    <Card.Title>{result.title}</Card.Title>
                    <Card.Description>{result?.description}</Card.Description>
                    <Card.Author>
                      by {result.author} ({result.source})
                    </Card.Author>
                    <Card.Age>{result.age}</Card.Age>
                  </Card.Content>
                </Card>
              ))
            : null}
        </Stack>
      ) : (
        <Stack alignItems="center" gap="large">
          <video width={560} autoPlay muted loop>
            <source src={FeedsVideoPath} type="video/mp4" />
            Your browser does not support playing a video.
          </video>

          <Text size="x-large" weight="bold">
            Personalize yours Feeds
          </Text>

          <Text size="medium" color="gray">
            The most interesting articles published by the feeds you personally
            follow will be here.
          </Text>

          <Link to="/add-source">
            <Button size="large" color="primary" type="button">
              Follow Feeds
            </Button>
          </Link>
        </Stack>
      )}
    </fetcher.Form>
  );
}
