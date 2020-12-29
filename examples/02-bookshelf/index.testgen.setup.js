import knex_module from 'knex'
import { nanoid } from 'nanoid'
import { env } from './util/env.js'

export async function getContext() {
  const schema = `test_${nanoid()}`
  const knex = new knex_module({
    client: 'pg',
    connection: env['DATABASE_URL'],
    searchPath: [schema],
    asyncStackTraces: true,
  })
  return { knex }
}

export const beforeAll = async function (context) {
  const { knex } = context
  await knex.migrate.latest()
  await knex.seed.run()
}

export const afterAll = async function (context) {
  const { knex } = context
  console.log('knex.client.database()', knex.client.database());
  await knex.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
  await knex.destroy()
}
