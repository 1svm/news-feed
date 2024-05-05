import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { Text, Button } from "~/components/ui";
import { Stack } from "~/components/layouts";
import FeedsVideoPath from "~/assets/videos/feeds.mp4";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Stack alignItems="center" gap="medium">
      <video width={520} autoPlay muted loop>
        <source src={FeedsVideoPath} type="video/mp4" />
        Your browser does not support playing a video.
      </video>

      <Text size="large" weight="bold">
        Personalize yours Feeds
      </Text>

      <Text size="small" color="gray">
        The most interesting articles published by the feeds you personally
        follow will be here.
      </Text>

      <Link to="/add-source">
        <Button size="medium" color="primary" type="button">
          Follow Feeds
        </Button>
      </Link>
    </Stack>
  );
}
