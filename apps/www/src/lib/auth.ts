import { initAuthHandler } from "@rectangular-labs/auth";
import { createAuthClient } from "@rectangular-labs/auth/client";
import { createDb } from "@rectangular-labs/db";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { serverEnv } from "./env";

export const getCurrentSession = createIsomorphicFn()
  .server(async () => {
    const env = serverEnv();
    const auth = initAuthHandler(env.VITE_APP_URL, createDb(env.DATABASE_URL));
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return session;
  })
  .client(async () => {
    const auth = createAuthClient();
    const session = await auth.getSession();
    return session.data;
  });

export const authClient = createAuthClient();
