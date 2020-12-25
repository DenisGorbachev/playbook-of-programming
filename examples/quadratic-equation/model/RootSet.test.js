import { RootSetSamples, validateRootSet } from './RootSet.js'

test('RootSet samples match schema', async function () {
  for (const sample of RootSetSamples) {
    const value = await validateRootSet(sample)
    expect(value).toBeDefined()
  }
})
