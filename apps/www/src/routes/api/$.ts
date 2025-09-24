import { createApiContext } from "@rectangular-labs/api/context";
import { openAPIHandler } from "@rectangular-labs/api/server";
import { initAuthHandler } from "@rectangular-labs/auth";
import { createBlogSearchServer } from "@rectangular-labs/content/search";
import { createDb } from "@rectangular-labs/db";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { serverEnv } from "~/lib/env";

const blogSearch = createBlogSearchServer();

async function handle({ request }: { request: Request }) {
  if (new URL(request.url).pathname.startsWith("/api/auth/")) {
    const env = serverEnv();
    const auth = initAuthHandler(env.VITE_APP_URL, createDb(env.DATABASE_URL));
    return await auth.handler(request);
  }
  if (new URL(request.url).pathname.startsWith("/api/blog/search")) {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }
    return await blogSearch.GET(request);
  }

  const env = serverEnv();
  const context = createApiContext({
    dbUrl: env.DATABASE_URL,
    url: new URL(request.url),
  });

  const { response } = await openAPIHandler(`${env.VITE_APP_URL}/api`).handle(
    request,
    {
      prefix: "/api",
      context,
    },
  );

  return response ?? new Response("Not Found", { status: 404 });
}

export const ServerRoute = createServerFileRoute("/api/$").methods({
  HEAD: handle,
  GET: handle,
  POST: handle,
  PUT: handle,
  PATCH: handle,
  DELETE: handle,
});
