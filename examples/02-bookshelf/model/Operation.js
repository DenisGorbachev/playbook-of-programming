import { ajv, getSchemaId } from '../../01-quadratic-equation/util/ajv.js'

export const OperationSamples = [
  ['setUserId', [1]],
  ['run', [['author', 'add']]], // an array of args for function contains an array of args for process
  ['getRoots', [{ a: 5, b: 6, c: 1 }]],
]

export const OperationSchema = {
  $async: true,
  $id: getSchemaId(__filename),
  title: 'operation',
  description: 'a elementary step of a process',
  type: 'array',
  minItems: 2,
  maxItems: 2,
  items: [
    { type: 'string' },
    { type: 'array' },
  ],
}

export const validateOperation = ajv.compile(OperationSchema)

