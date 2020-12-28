import { ProcessSamples, validateProcess } from './Process.js'

test('Process samples match schema', async function() {
  for (const sample of ProcessSamples) {
    const value = await validateProcess(sample)
    expect(value).toBeDefined()
  }
})
