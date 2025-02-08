import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from 'drizzle-orm'
import { check, sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core'

import { polls } from './polls'
import { votes } from './votes'

export const responses = sqliteTable('responses', {
  id: text().notNull().$defaultFn(() => createId()).primaryKey(),

  response: text().notNull(),
  order: integer().notNull(),

  poll_id: text().notNull().references(() => polls.id),
}, table => [
  check('question_minimum', sql`${table.order} > -1`),
  check('question_maximum', sql`${table.order} < 8`),
  unique('question_order_unique_per_poll').on(table.poll_id, table.order),
])

export const responsesRelations = relations(responses, ({ one, many }) => ({
  poll: one(polls, {
    fields: [responses.poll_id],
    references: [polls.id],
  }),
  votes: many(votes),
}))
