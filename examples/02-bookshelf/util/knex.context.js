import knex_module from 'knex'
import { execSync } from 'child_process'
import { nanoid } from 'nanoid'
import { join } from 'path'
import { Client } from 'pg'
import fs from 'fs'
import * as tmp from 'tmp'

const result = require('dotenv').config({ path: join(__dirname, '..', 'prisma', '.env') })
if (result.error) {
  console.error(result.error)
  process.exit(1)
}
const env = result.parsed

export function createTestContext() {
  let ctx = {}
  const knexCtx = knexTestContext()
  beforeEach(async () => {
    const knex = await knexCtx.before()
    Object.assign(ctx, { knex })
  })
  afterEach(async () => {
    await knexCtx.after()
  })
  return ctx
}

function knexTestContext() {
  const schemaSqlFilename = join(__dirname, '..', 'prisma', 'schema.sql')
  let schema = ''
  let databaseUrl = ''
  let databaseUrlWithSchema = ''
  let knex = null
  return {
    async before() {
      // Generate a unique schema identifier for this test context
      const schemaFile = tmp.tmpNameSync({ postfix: '.sql' })
      const schemaSql = fs.readFileSync(schemaSqlFilename, { encoding: 'UTF8' })
      fs.writeFileSync(schemaFile, schemaSql.replace(/"public"/g, `"${schema}"`))
      // Generate the pg connection string for the test schema
      databaseUrl = env.DATABASE_URL
      databaseUrlWithSchema = `${databaseUrl}?schema=${schema}`
      // Set the required environment variable to contain the connection string
      // to our database test schema
      process.env.DATABASE_URL = databaseUrl
      // Run the migrations to ensure our schema has the required structure
      const result = execSync(`psql "${env.DATABASE_URL}" -f ${schemaFile}`, {
        // stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: databaseUrl },
      })

      // await knex.initialize()
      return knex
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Client({
        connectionString: databaseUrl,
      })
      await client.connect()
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      await client.end()
      await knex?.destroy()
    },
  }
}
