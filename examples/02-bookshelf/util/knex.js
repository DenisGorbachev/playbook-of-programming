import * as knex_module from 'knex'
import config from '../config.js'

export const knex = knex_module(config.knex)
