import { BookValidSamples, BookInvalidSamples, getBookErrors } from './Book.js'

test.each(BookValidSamples)('Book valid sample matches schema', async function (sample) {
  const errors = await getBookErrors(sample)
  if (errors.length) console.warn(sample)
  await expect(errors).toEqual([])
})

test.each(BookInvalidSamples)('Book invalid sample does not match schema', async function (sample) {
  const errors = await getBookErrors(sample)
  if (!errors.length) console.warn(sample)
  await expect(errors).not.toEqual([])
})
