import { ajv } from '../util/ajv.js'

export const CoefficientSetSamples = [
  { a: 5, b: 6, c: 1 },
  { a: 5, b: -14, c: -3 },
  { a: 1, b: 3, c: -10 },
]

export const CoefficientSetSchema = {
  $async: true,
  title: 'coefficientSet',
  description: 'a set of coefficients of a quadratic equation',
  type: 'object',
  properties: {
    a: { type: 'number' },
    b: { type: 'number' },
    c: { type: 'number' },
  },
}

export const validateCoefficientSet = ajv.compile(CoefficientSetSchema)
