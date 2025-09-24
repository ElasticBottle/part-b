import { drizzle } from "drizzle-orm/postgres-js";
import type postgres from "postgres";
import * as authSchema from "./schema/auth-schema";
import * as userAnswerSchema from "./schema/user-answer-schema";

export * from "drizzle-orm";

const schema = {
  ...authSchema,
  ...userAnswerSchema,
};

let db: ReturnType<
  typeof drizzle<typeof schema, postgres.Sql<Record<string, never>>>
> | null = null;

export const createDb = (connectionString: string) => {
  if (db) {
    return db;
  }
  db = drizzle(connectionString, {
    schema,
    casing: "snake_case",
    logger: true,
  });
  return db;
};

export type DB = ReturnType<typeof createDb>;
