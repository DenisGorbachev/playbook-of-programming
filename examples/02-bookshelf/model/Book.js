import { ajv, getSchemaId } from '../util/ajv.js'

export const BookValidSamples = [
  { name: '1984', authorId: 1 },
  { name: 'Kafka on the Shore', authorId: 2 },
  { name: 'Generation П', authorId: 3 },
]

export const BookInvalidSamples = [
  { name: '', authorId: 1 }, // name too small
  { name: '1984', authorId: 0 }, // authorId less than 1
]

export const BookSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'book',
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    authorId: { type: 'integer', minimum: 1 },
  },
  allRequired: true,
}

export const validateBook = ajv.compile(BookSchema)

export const getBookErrors = async function (book) {
  return validateBook(book).then(() => []).catch((error) => error.errors || error)
}

