import * as schema from '../database'
import { describe, it } from '../utils/vitest'

describe('database tests', () => {
  describe('polls', () => {
    describe('creation', async () => {
      it('requires polls to have a question', async ({ expect, sqlite }) => {
        expect.assertions(1)

        await expect(
          sqlite.insert(schema.polls).values({} as typeof schema.polls.$inferInsert),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `[SqliteError: NOT NULL constraint failed: polls.question]`,
        )
      })

      it('allows valid polls to be created', async ({ expect, sqlite }) => {
        expect.assertions(1)

        const result = await sqlite.insert(schema.polls).values({
          question: 'test question',
        })

        expect(result.changes).toEqual(1)
      })
    })
  })

  describe('responses', () => {
    it('requires order to be above 0', async ({ expect, sqlite }) => {
      expect.assertions(1)

      await expect(sqlite.transaction(async (tx) => {
        const result = await tx.insert(schema.polls).values({
          question: 'test question',
        }).returning()

        return tx.insert(schema.responses).values([{
          response: 'test response',
          order: 0,
          poll_id: result[0].id,
        }])
      })).rejects.toThrowErrorMatchingInlineSnapshot(`[SqliteError: CHECK constraint failed: question_minimum]`)
    })

    it('requires order to be below 9', async ({ expect, sqlite }) => {
      expect.assertions(1)

      await expect(sqlite.transaction(async (tx) => {
        const result = await tx.insert(schema.polls).values({
          question: 'test question',
        }).returning()

        return tx.insert(schema.responses).values([{
          response: 'test response',
          order: 9,
          poll_id: result[0].id,
        }])
      })).rejects.toThrowErrorMatchingInlineSnapshot(`[SqliteError: CHECK constraint failed: question_maximum]`)
    })

    it('requires order to be unique per poll', async ({ expect, sqlite }) => {
      expect.assertions(1)

      await expect(sqlite.transaction(async (tx) => {
        const result = await tx.insert(schema.polls).values({
          question: 'test question',
        }).returning()

        return tx.insert(schema.responses).values([{
          response: 'test response',
          order: 1,
          poll_id: result[0].id,
        },
        {
          response: 'test response',
          order: 1,
          poll_id: result[0].id,
        }])
      })).rejects.toThrowErrorMatchingInlineSnapshot(`[SqliteError: UNIQUE constraint failed: responses.poll_id, responses.order]`)
    })
  })

  describe('votes', () => {
    it('requires a valid poll', async ({ expect, sqlite }) => {
      expect.assertions(1)

      await expect(
        sqlite.insert(schema.votes).values({ } as typeof schema.votes.$inferInsert),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`[SqliteError: NOT NULL constraint failed: votes.poll_id]`)
    })

    it('requires a valid response', async ({ expect, sqlite }) => {
      expect.assertions(1)

      const polls = await sqlite.insert(schema.polls).values({ question: 'test question' }).returning()

      await expect(
        sqlite.insert(schema.votes).values({ poll_id: polls[0].id } as typeof schema.votes.$inferInsert),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`[SqliteError: NOT NULL constraint failed: votes.response_id]`)
    })

    it('allows valid responses', async ({ expect, sqlite }) => {
      expect.assertions(1)

      const polls = await sqlite.insert(schema.polls).values({ question: 'test question' }).returning()
      const responses = await sqlite.insert(schema.responses).values([{
        response: 'first response',
        order: 1,
        poll_id: polls[0].id,
      }, {
        response: 'second response',
        order: 2,
        poll_id: polls[0].id,
      }]).returning()

      await expect(
        sqlite.insert(schema.votes).values({ poll_id: polls[0].id, response_id: responses[0].id }),
      ).resolves.toMatchInlineSnapshot(`
        {
          "changes": 1,
          "lastInsertRowid": 1,
        }
      `)
    })
  })
})
