import { ProgramValidSamples, ProgramInvalidSamples, getProgramErrors } from './Program.js'

test('Program valid samples match schema', async function () {
  for (const sample of ProgramValidSamples) {
    await expect(getProgramErrors(sample)).resolves.toEqual([])
  }
})

test('Program invalid samples do not match schema', async function () {
  for (const sample of ProgramInvalidSamples) {
    await expect(getProgramErrors(sample)).resolves.toContainEqual(expect.any(Object))
  }
})
