import { AuthorValidSamples, AuthorInvalidSamples, getAuthorErrors } from './Author.js'

test.each(AuthorValidSamples)('Author valid sample matches schema', async function (sample) {
  const errors = await getAuthorErrors(sample)
  if (errors.length) console.warn(sample)
  await expect(errors).toEqual([])
})

test.each(AuthorInvalidSamples)('Author invalid sample does not match schema', async function (sample) {
  const errors = await getAuthorErrors(sample)
  if (!errors.length) console.warn(sample)
  await expect(errors).not.toEqual([])
})
