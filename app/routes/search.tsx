import { Suspense } from "react";
import { Await, useFetcher, useLoaderData } from "@remix-run/react";
import {
  defer,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { NewsService } from "~/services";

import { Stack, Columns } from "~/components/layouts";
import { Dropdown, Card, Text, SearchInput } from "~/components/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const newsService = new NewsService({
    theGuardianApiKey:
      process.env.THE_GUARDIAN_API_KEY ??
      "19530c7c-1e9e-4870-98e0-748d4dcecc63",
    newYorkTimesApiKey: process.env.NEW_YORK_TIMES_API_KEY ?? "",
    newsApiKey: process.env.NEWS_API_KEY ?? "",
  });
  const results = newsService.fetchNews(request.url);

  return defer({
    results,
  });
};

export default function Search() {
  const fetcher = useFetcher();
  const { results } = useLoaderData<typeof loader>();

  return (
    <fetcher.Form method="get">
      <Stack gap="large">
        <Stack alignItems="center" gap="medium">
          <Text size="large" weight="bold" align="left">
            Search for specific topics, companies, technologies, or products
          </Text>
          <SearchInput size="large" color="primary" />
        </Stack>

        <Columns>
          <Columns.Column size="30">
            <Stack gap="medium">
              <Dropdown label="feed" value={""} placeholder="Select an option">
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>

              <Dropdown
                label="published"
                value={""}
                placeholder="Select an option"
              >
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>

              <Dropdown
                label="categories"
                value={""}
                placeholder="Select an option"
              >
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>
            </Stack>
          </Columns.Column>

          <Columns.Column size="70">
            <Suspense fallback={<h1>Loading</h1>}>
              <Await resolve={results}>
                {(results) => (
                  <Stack gap="large">
                    {results.map((result) => (
                      <Card key={result.title}>
                        <Card.Thumbnail
                          src={result.thumbnail}
                          alt="Thumbnail Description"
                        />
                        <Card.Content>
                          <Card.Title>{result.title}</Card.Title>
                          <Card.Description>
                            {result.description}
                          </Card.Description>
                          <Card.Author>by {result.author}</Card.Author>
                          <Card.Age>{result.age}</Card.Age>
                        </Card.Content>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Await>
            </Suspense>
          </Columns.Column>
        </Columns>
      </Stack>
    </fetcher.Form>
  );
}
