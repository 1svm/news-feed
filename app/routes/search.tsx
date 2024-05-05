import type { MetaFunction } from "@remix-run/node";

import { Stack, Columns } from "~/components/layouts";
import { Card, Text, SearchInput } from "~/components/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Search() {
  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  return (
    <Stack gap="large">
      <Stack alignItems="center" gap="medium">
        <Text size="large" weight="bold" align="left">
          Search for specific topics, companies, technologies, or products
        </Text>
        <SearchInput size="large" color="primary" onSearch={handleSearch} />
      </Stack>

      <Columns>
        <Columns.Column size="25">
          <div>Content</div>
        </Columns.Column>

        <Columns.Column size="75">
          <Card>
            <Card.Thumbnail
              src="https://www.freecodecamp.org/news/content/images/2021/10/golang.png"
              alt="Thumbnail Description"
            />
            <Card.Content>
              <Card.Title>Title of the Article</Card.Title>
              <Card.Description>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                vero similique quas consequatur dolor nam, quod, aspernatur
                distinctio tempore, aliquid a mollitia dolore quis veniam
                eligendi laboriosam! Earum, autem quam!
              </Card.Description>
              <Card.Author>by John Doe</Card.Author>
              <Card.Age>3 days ago</Card.Age>
            </Card.Content>
          </Card>
        </Columns.Column>
      </Columns>
    </Stack>
  );
}
