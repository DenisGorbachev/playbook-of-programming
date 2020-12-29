import { ajv, getSchemaId } from '../../util/ajv.js'
import { OperationSchema } from './Operation.js'

export const ProcessSamples = [
  [
    ['run', [['author', 'add', '"George Orwell"']]],
    ['run', [['author', 'list']]],
  ],
  [
    ['run', [['author', 'list']]],
  ],
  [
    ['run', [['author', 'add', '"George Orwell"']]],
    ['run', [['book', 'add', '"1984"', '"George Orwell"']]],
    ['run', [['book', 'list']]],
  ],
]

export const ProcessSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'process',
  description: 'a sequence of elementary operations',
  type: 'array',
  items: { $ref: OperationSchema.$id },
}

export const validateProcess = ajv.compile(ProcessSchema)

