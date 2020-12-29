import { ajv, getSchemaId } from '../../util/ajv.js'
import { getSchemaErrors } from '../util/check.js'
import { validateAuthor } from '../../model/Author.js'

export const CheckSamples = [
  async function (snapshot) {
    return await getSchemaErrors(snapshot.authors, validateAuthor)
  },
  async function ({authors, books}) {
    return compact(snapshot.books.map((book) => {
      if (!find(authors, {id: book.authorId})) {
        return {}
      }
    }))
  },
  ['run', [['author', 'add']]], // an array of args for function contains an array of args for process
  ['getRoots', [{ a: 5, b: 6, c: 1 }]],
]

export const CheckSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'check',
  description: 'a elementary step of a process',
  type: 'array',
  minItems: 2,
  maxItems: 2,
  items: [
    { type: 'string' },
    { type: 'array' },
  ],
}

export const validateCheck = ajv.compile(CheckSchema)

