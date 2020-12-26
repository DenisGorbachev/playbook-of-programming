import Ajv from 'ajv'
import path from 'path'

export const ajv = new Ajv({ $data: true })

export const getSharedBeginning = function (a1, a2) {
  let i = 0
  while (i < a1.length && a1.charAt(i) === a2.charAt(i)) i++
  return a1.substring(0, i)
}

export const getSchemaId = function (filename) {
  const { dir, name } = path.parse(filename)
  const projectDir = path.resolve(__dirname + '/..')
  const relativeDir = dir.replace(projectDir + '/', '')
  const nameWithoutExtension = name.split('.')[0]
  const projectName = projectDir.split(path.sep).pop()
  return `https://${projectName}/schemas/${relativeDir}/${nameWithoutExtension}`
}
