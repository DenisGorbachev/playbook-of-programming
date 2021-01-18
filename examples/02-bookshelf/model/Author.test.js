import { AuthorValidSamples, AuthorInvalidSamples, getAuthorErrors } from './Author.js'

test.each(AuthorValidSamples)('Author valid sample matches schema \n%o', async function (sample) {
  await expect(getAuthorErrors(sample)).resolves.toEqual([])
})

test.each(AuthorInvalidSamples)('Author invalid sample does not match schema \n%o', async function (sample) {
  await expect(getAuthorErrors(sample)).resolves.toContainEqual(expect.any(Object))
})
