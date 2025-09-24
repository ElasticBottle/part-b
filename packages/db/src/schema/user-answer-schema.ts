import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps } from "./_helper";
import { user } from "./auth-schema";

export const userAnswerTable = pgTable(
  "ra_user_question_answer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    questionSlug: text("question_slug").notNull(),
    subject: text("subject").notNull(),
    selectedAnswer: integer("selected_answer"),
    isCorrect: boolean("is_correct").notNull(),
    answeredAt: timestamp({ mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("unique_user_question_subject").on(
      table.userId,
      table.questionSlug,
      table.subject,
    ),
    index("index_user_question_subject").on(table.userId, table.subject),
  ],
);
export const userAnswerRelations = relations(userAnswerTable, ({ one }) => ({
  user: one(user, {
    fields: [userAnswerTable.userId],
    references: [user.id],
  }),
}));
