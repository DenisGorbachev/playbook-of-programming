import { ajv } from '../util/ajv.js'

export const ProcessArgumentsSamples = [
  ['babel-node', './index.js', '5', '6', '1'],
  ['babel-node', './index.js', '5', '-14', '-3 '],
  ['babel-node', './index.js', '1', '3', '-10'],
]

export const ProcessArgumentsScheme = {
  title: 'process arguments',
  type: 'array',
  items: { type: 'string' },
}

export const validateProcessArguments = ajv.compile(ProcessArgumentsScheme)
