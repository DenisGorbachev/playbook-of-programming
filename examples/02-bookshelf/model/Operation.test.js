import { OperationSamples, validateOperation } from './Operation.js'

test('Operation samples match schema', async function() {
  for (const sample of OperationSamples) {
    const value = await validateOperation(sample)
    expect(value).toBeDefined()
  }
})
