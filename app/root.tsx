import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { Text } from "~/components/ui";
import { Stack, Inline, Nav } from "~/components/layouts";
import { NewsFeedIcon, NewsFeedPlusIcon, SearchIcon } from "~/components/icons";

import indexStylesHref from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStylesHref },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Stack gap="extra-large">
      <Nav>
        <Nav.Item>
          <Link to="/">
            <Inline gap="small">
              <NewsFeedIcon />
              <Text size="medium" weight="bold">
                NEWS FEED
              </Text>
            </Inline>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Inline gap="large">
            <Link to="/add-source">
              <NewsFeedPlusIcon />
            </Link>
            <Link to="/search">
              <SearchIcon />
            </Link>
          </Inline>
        </Nav.Item>
      </Nav>
      <main style={{ padding: "0 60px" }}>
        <Outlet />
      </main>
    </Stack>
  );
}
