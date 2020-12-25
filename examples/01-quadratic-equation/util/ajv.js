import Ajv from 'ajv'
import path from 'path'

export const ajv = new Ajv({ $data: true })

ajv.addKeyword({
  keyword: 'isCheck',
  type: 'object',
  validate: function (check) {
    // must have `isValid` function
    // must have `isStrictAs` function
    // must not have any parameters (parametrization should be done via subclassing)
    // must validate as false all data that parent validates as false
    // may validate as false some data that parent validates as true
    // the checks of the check are not checked by the system, must be applied by the programmer while writing the check
    return true
  },
  schema: false,
  async: false,
})

ajv.addKeyword({
  keyword: 'nonzero',
  type: 'number',
  validate: function (data) {
    return data !== 0
  },
  schema: false,
  async: false,
})

export const getSchemaId = function (filename) {
  const { dir, name } = path.parse(filename)
  const relativeDir = dir.replace(__dirname + '/', '')
  const nameFirstPart = name.split('.')[0]
  return `https://playbook.io/schemas/${relativeDir}/${nameFirstPart}`
}
