import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { responses } from './responses'
import { votes } from './votes'

export const polls = sqliteTable('polls', {
  id: text().notNull().$defaultFn(() => createId()).primaryKey(),

  question: text().notNull(),
})

export const pollsRelations = relations(polls, ({ many }) => ({
  responses: many(responses),
  votes: many(votes),
}))
