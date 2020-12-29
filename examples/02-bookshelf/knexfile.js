import devSecret from './config.dev.secret.js'
import prodSecret from './config.prod.secret.js'

module.exports = {
  dev: devSecret.knex,
  prod: prodSecret.knex,
}
