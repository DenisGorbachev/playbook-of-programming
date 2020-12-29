import { BookValidSamples, BookInvalidSamples, getBookErrors } from './Book.js'

test('Book valid samples match schema', async function () {
  for (const sample of BookValidSamples) {
    await expect(getBookErrors(sample)).resolves.toEqual([])
  }
})

test('Book invalid samples do not match schema', async function () {
  for (const sample of BookInvalidSamples) {
    await expect(getBookErrors(sample)).resolves.toContainEqual(expect.any(Object))
  }
})
