import { ajv, getSchemaId } from '../util/ajv.js'

export const AuthorValidSamples = [
  { name: 'George Orwell' },
  { name: '村上 春樹' },
  { name: 'Виктор Пелевин' },
]

export const AuthorSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'author',
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
  },
  allRequired: true,
}

export const validateAuthor = ajv.compile(AuthorSchema)

