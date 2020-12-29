import { join } from 'path'

const result = require('dotenv').config({ path: join(__dirname, '..', '.env') })

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

export const env = result.parsed
