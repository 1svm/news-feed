import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

import { Stack, Columns } from "~/components/layouts";
import { Dropdown, Card, Text, SearchInput } from "~/components/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Search() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
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
        <Columns.Column size="30">
          <Dropdown
            label="feed"
            value={selectedValue}
            onChange={handleSelectChange}
            placeholder="Select an option"
          >
            <Dropdown.Option value="1">Option 1</Dropdown.Option>
            <Dropdown.Option value="2">Option 2</Dropdown.Option>
            <Dropdown.Option value="3">Option 3</Dropdown.Option>
          </Dropdown>
        </Columns.Column>

        <Columns.Column size="70">
          <Stack gap="large">
            <Card>
              <Card.Thumbnail
                src="https://www.freecodecamp.org/news/content/images/2021/10/golang.png"
                alt="Thumbnail Description"
              />
              <Card.Content>
                <Card.Title>Title of the Article</Card.Title>
                <Card.Description>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit vero similique quas consequatur dolor nam, quod,
                  aspernatur distinctio tempore, aliquid a mollitia dolore quis
                  veniam eligendi laboriosam! Earum, autem quam!
                </Card.Description>
                <Card.Author>by John Doe</Card.Author>
                <Card.Age>3 days ago</Card.Age>
              </Card.Content>
            </Card>

            <Card>
              <Card.Thumbnail
                src="https://www.freecodecamp.org/news/content/images/2021/10/golang.png"
                alt="Thumbnail Description"
              />
              <Card.Content>
                <Card.Title>Title of the Article</Card.Title>
                <Card.Description>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit vero similique quas consequatur dolor nam, quod,
                  aspernatur distinctio tempore, aliquid a mollitia dolore quis
                  veniam eligendi laboriosam! Earum, autem quam!
                </Card.Description>
                <Card.Author>by John Doe</Card.Author>
                <Card.Age>3 days ago</Card.Age>
              </Card.Content>
            </Card>
          </Stack>
        </Columns.Column>
      </Columns>
    </Stack>
  );
}
