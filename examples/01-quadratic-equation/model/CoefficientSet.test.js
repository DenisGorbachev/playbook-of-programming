import { CoefficientSetSamples, validateCoefficientSet } from './CoefficientSet.js'

test('CoefficientSet samples match schema', async function() {
  for (const sample of CoefficientSetSamples) {
    const value = await validateCoefficientSet(sample)
    expect(value).toBeDefined()
  }
})
