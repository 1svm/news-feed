import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

import {
  TheGuardianIcon,
  NewYorkTimesIcon,
  NewsOrgIcon,
} from "~/components/icons";
import { Text, Card } from "~/components/ui";
import { Stack, Inline } from "~/components/layouts";
import {
  HandlerID,
  TheGuardianHandler,
  NewYorkTimesHandler,
  NewsOrgHandler,
} from "~/services";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function AddSource() {
  const [source, setSource] = useState<HandlerID>();
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    if (!source) {
      setSource(localStorage.getItem("source") as HandlerID);
      return;
    }
    localStorage.setItem("source", source);
  }, [source]);

  useEffect(() => {
    if (!category) {
      setCategory(localStorage.getItem("category") as string);
      return;
    }
    localStorage.setItem("category", category);
  }, [category]);

  const handleSourceChange = (handlerID: HandlerID) => setSource(handlerID);

  const handleCategoryChange = (category: string) => setCategory(category);

  return (
    <Stack gap="extra-large">
      <Stack gap="large">
        <Text size="x-large" weight="bold">
          Select your favorite source
        </Text>

        <Inline gap="extra-large">
          <Card
            dark
            size="small"
            selected={source === TheGuardianHandler.ID}
            onClick={() => handleSourceChange(TheGuardianHandler.ID)}
          >
            <TheGuardianIcon />
          </Card>
          <Card
            size="small"
            selected={source === NewYorkTimesHandler.ID}
            onClick={() => handleSourceChange(NewYorkTimesHandler.ID)}
          >
            <NewYorkTimesIcon />
          </Card>
          <Card
            size="small"
            selected={source === NewsOrgHandler.ID}
            onClick={() => handleSourceChange(NewsOrgHandler.ID)}
          >
            <NewsOrgIcon />
          </Card>
        </Inline>
      </Stack>

      <Stack gap="large">
        <Text size="x-large" weight="bold">
          Select your favorite cateogry
        </Text>

        <Inline gap="extra-large">
          <Card
            padding
            selected={category === "business"}
            onClick={() => handleCategoryChange("business")}
          >
            <Text size="x-large" weight="bold" align="center">
              BUSINESS
            </Text>
          </Card>
          <Card
            padding
            selected={category === "entertainment"}
            onClick={() => handleCategoryChange("entertainment")}
          >
            <Text size="x-large" weight="bold" align="center">
              ENTERTAINMENT
            </Text>
          </Card>
          <Card
            padding
            selected={category === "health"}
            onClick={() => handleCategoryChange("health")}
          >
            <Text size="x-large" weight="bold" align="center">
              HEALTH
            </Text>
          </Card>
          <Card
            padding
            selected={category === "science"}
            onClick={() => handleCategoryChange("science")}
          >
            <Text size="x-large" weight="bold" align="center">
              SCIENCE
            </Text>
          </Card>
          <Card
            padding
            selected={category === "sports"}
            onClick={() => handleCategoryChange("sports")}
          >
            <Text size="x-large" weight="bold" align="center">
              SPORTS
            </Text>
          </Card>
          <Card
            padding
            selected={category === "technology"}
            onClick={() => handleCategoryChange("technology")}
          >
            <Text size="x-large" weight="bold" align="center">
              TECHNOLOGY
            </Text>
          </Card>
        </Inline>
      </Stack>
    </Stack>
  );
}
