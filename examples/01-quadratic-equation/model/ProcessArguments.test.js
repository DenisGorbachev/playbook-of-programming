import { ProcessArgumentsSamples, validateProcessArguments } from './ProcessArguments.js'

test('ProcessArguments samples match schema', async function() {
  for (const sample of ProcessArgumentsSamples) {
    const value = await validateProcessArguments(sample)
    expect(value).toBeDefined()
  }
})
