import knex_module from 'knex'
import { merge } from 'lodash'
import { nanoid } from 'nanoid'
import config from '../config.js'

export const createContext = async function () {
  const schema = `test_${nanoid()}`
  const knex = new knex_module(merge({}, config.knex, {
    searchPath: [schema],
    asyncStackTraces: true,
  }))
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
  await knex.migrate.latest()
  return { knex }
}

export const destroyContext = async function (context) {
  const { knex } = context
  await knex.raw(`DROP SCHEMA IF EXISTS "${knex.client.config.searchPath[0]}" CASCADE`)
  await knex.destroy()
}
