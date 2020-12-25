import Ajv from 'ajv'
import path from 'path'

export const ajv = new Ajv({ $data: true })

export const getSchemaId = function (filename) {
  const { dir, name } = path.parse(filename)
  const relativeDir = dir.replace(__dirname + '/', '')
  const nameFirstPart = name.split('.')[0]
  return `https://playbook.io/schemas/${relativeDir}/${nameFirstPart}`
}
