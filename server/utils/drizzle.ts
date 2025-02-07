import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'
export const tables = schema

export const useDrizzle = () => {
  const db = useDatabase()
  const client = db.getInstance()

  const drizzleDb = drizzle<typeof schema>({
    client,
    schema,
  })

  // Run migrations automatically in development mode
  if (process.env.NODE_ENV === 'development') {
    const __dirname = dirname(fileURLToPath(import.meta.url))

    migrate(drizzleDb, {
      // nuxt runs from .nuxt/dev
      migrationsFolder: join(__dirname, '../../server/database/migrations'),
    })
  }

  return drizzleDb
}

export type User = typeof schema.users.$inferSelect
