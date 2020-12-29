import { merge } from 'lodash'

const secret = require(`${__dirname}/config.${process.env.NODE_ENV}.secret.js`)

export default merge({
  knex: {
    asyncStackTraces: true,
  },
}, secret.default)
