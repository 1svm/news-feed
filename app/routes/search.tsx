import { useFetcher } from "@remix-run/react";
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
  newYorkTimesApiKey: process.env.NEW_YORK_TIMES_API_KEY ?? "",
  newsApiKey: process.env.NEWS_API_KEY ?? "",
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
  const fetcher = useFetcher<any>();

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
          <Columns.Column size="25">
            <Stack gap="medium">
              <Dropdown
                disabled={!fetcher.data}
                name="feed"
                label="feed"
                value={""}
                placeholder="Select feed"
              >
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>

              <Dropdown
                disabled={!fetcher.data}
                name="published"
                label="published"
                value={""}
                placeholder="Select age"
              >
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>

              <Dropdown
                disabled={!fetcher.data}
                name="category"
                label="category"
                value={""}
                placeholder="Select cateogry"
              >
                <Dropdown.Option value="1">Option 1</Dropdown.Option>
                <Dropdown.Option value="2">Option 2</Dropdown.Option>
                <Dropdown.Option value="3">Option 3</Dropdown.Option>
              </Dropdown>
            </Stack>
          </Columns.Column>

          <Columns.Column size="75">
            {fetcher.data ? (
              <Stack gap="large">
                {fetcher.data.map((result: any) => (
                  <Card key={result.title}>
                    <Card.Thumbnail
                      src={result.thumbnail}
                      alt="Thumbnail Description"
                    />
                    <Card.Content>
                      <Card.Title>{result.title}</Card.Title>
                      <Card.Description>{result?.description}</Card.Description>
                      <Card.Author>by {result.author}</Card.Author>
                      <Card.Age>{result.age}</Card.Age>
                    </Card.Content>
                  </Card>
                ))}
              </Stack>
            ) : null}
          </Columns.Column>
        </Columns>
      </Stack>
    </fetcher.Form>
  );
}
