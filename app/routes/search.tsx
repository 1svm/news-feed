import { useSearchParams, useLoaderData } from "@remix-run/react";
import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { NewsService } from "~/services";

import { Stack, Columns } from "~/components/layouts";
import { Dropdown, Card, Text, SearchInput } from "~/components/ui";

const newsService = new NewsService({
  theGuardianApiKey:
    process.env.THE_GUARDIAN_API_KEY ?? "19530c7c-1e9e-4870-98e0-748d4dcecc63",
  newYorkTimesApiKey:
    process.env.NEW_YORK_TIMES_API_KEY ?? "lsQGodDgAribsRZjGHJ4ifaF2xjCkXo9",
  newsApiKey: process.env.NEWS_API_KEY ?? "8a844bb3e98a4a0a8078039fc8ff8073",
});

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await newsService.fetchNews(request.url));
};

export default function Search() {
  const news = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Stack gap="large">
      <Stack alignItems="center" gap="medium">
        <Text size="large" weight="bold" align="left">
          Search for specific topics, companies, technologies, or products
        </Text>
        <SearchInput
          size="large"
          color="primary"
          value={searchParams.get("query") ?? ""}
          onEnterKeyPress={(value) => {
            setSearchParams({ query: value });
          }}
        />
      </Stack>

      <Columns>
        <Columns.Column size="25">
          <Stack gap="medium">
            <Dropdown
              disabled={!news?.length}
              name="feed"
              label="feed"
              placeholder="Select feed"
              value={searchParams.get("source") ?? ""}
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("source", e.currentTarget.value);
                  return prev;
                });
              }}
            >
              <Dropdown.Option value="THE_GUARDIAN">
                The Guardian
              </Dropdown.Option>
              <Dropdown.Option value="NEW_YORK_TIMES">
                New York Times
              </Dropdown.Option>
              <Dropdown.Option value="NEWS_ORG">News.org</Dropdown.Option>
            </Dropdown>

            <Dropdown
              disabled={!news?.length}
              name="published"
              label="published"
              placeholder="Select age"
              value={searchParams.get("fromDate") ?? ""}
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("fromDate", e.currentTarget.value);
                  return prev;
                });
              }}
            >
              <Dropdown.Option value="LAST_7">Last 7 Days</Dropdown.Option>
              <Dropdown.Option value="LAST_30">Last 30 days</Dropdown.Option>
              <Dropdown.Option value="LAST_90">Last 90 days</Dropdown.Option>
            </Dropdown>
          </Stack>
        </Columns.Column>

        <Columns.Column size="75">
          {Array.isArray(news) && news.length > 0 ? (
            <Stack gap="large">
              {news.map((result: any) => (
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
              ))}
            </Stack>
          ) : null}
        </Columns.Column>
      </Columns>
    </Stack>
  );
}
