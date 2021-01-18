import { BookValidSamples, BookInvalidSamples, getBookErrors } from './Book.js'

test.each(BookValidSamples)('Book valid sample matches schema \n%o', async function (sample) {
  await expect(getBookErrors(sample)).resolves.toEqual([])
})

test.each(BookInvalidSamples)('Book invalid sample does not match schema \n%o', async function (sample) {
  await expect(getBookErrors(sample)).resolves.toContainEqual(expect.any(Object))
})
