import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { polls } from './polls'
import { responses } from './responses'

export const votes = sqliteTable('votes', {
  id: text().notNull().$defaultFn(() => createId()).primaryKey(),

  poll_id: text().notNull().references(() => polls.id),
  response_id: text().notNull().references(() => responses.id),

  timestamp: text().notNull().default(sql`(current_timestamp)`),
})

export const votesRelations = relations(votes, ({ one }) => ({
  poll: one(polls, {
    fields: [votes.poll_id],
    references: [polls.id],
  }),
  response: one(responses, {
    fields: [votes.response_id],
    references: [responses.id],
  }),
}))
