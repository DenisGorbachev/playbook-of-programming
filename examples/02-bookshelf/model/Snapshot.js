import { assignIds, assignSequence } from '../testgen-ext/util.js'
import { ajv, getSchemaId } from '../util/ajv.js'
import { AuthorValidSamples, AuthorSchema } from './Author.js'
import { BookValidSamples, BookSchema } from './Book.js'

export const SnapshotValidSamples = [
  {
    authors: assignIds(AuthorValidSamples),
    books: assignSequence(assignIds(BookValidSamples), 'authorId'),
  },
]

export const SnapshotInvalidSamples = [
  {
    // validate that all books must have correct authorIds
    authors: [
      { id: 1, name: 'George Orwell' },
    ],
    books: [
      { id: 1, name: '1984', authorId: 3 },
    ],
  },
]

export const SnapshotSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'snapshot',
  type: 'object',
  properties: {
    authors: {
      type: 'array',
      uniqueItemProperties: ['id'],
      items: { $ref: AuthorSchema.$id },
    },
    books: {
      type: 'array',
      uniqueItemProperties: ['id'],
      items: {
        $merge: {
          source: { $ref: BookSchema.$id },
          with: {
            // id: { type: 'number', minimum: 1 },
            authorId: { enum: {} },
          },
        },
      },
    },
  },
  allRequired: true,
}

export const validateSnapshot = ajv.compile(SnapshotSchema)

