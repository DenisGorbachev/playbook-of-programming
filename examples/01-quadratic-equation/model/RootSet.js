import { ajv } from '../util/ajv.js'

export const RootSetSamples = [
  { x1: -1, x2: -0.2 },
  { x1: -0.2, x2: 3 },
  { x1: -5, x2: 2 },
]

export const RootSetSchema = {
  $async: true,
  title: 'rootSet',
  description: 'a set of roots of quadratic equation',
  type: 'object',
  properties: {
    x1: { type: 'number' },
    x2: { type: 'number' },
  },
}

export const validateRootSet = ajv.compile(RootSetSchema)
