import path from 'node:path'
import Database from 'better-sqlite3'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { test as base } from 'vitest'
import * as schema from '../database'

export { describe } from 'vitest'

interface testFixtures {
  sqlite: BetterSQLite3Database<typeof schema>
}

export const test = base.extend<testFixtures>({
  sqlite: async ({ task: _task }, use) => {
    // Create an in-memory database
    const client = new Database(':memory:')

    // Connect drizzle
    const db = drizzle({
      client,
      schema,
    })

    // Run migrations
    migrate(db, {
      migrationsFolder: path.resolve('./server/database/migrations'),
    })

    // Provide it for test
    await use(db)

    // Close it when done!
    client.close()
  },
})

export const it = test
