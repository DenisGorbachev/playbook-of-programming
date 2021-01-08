import { AuthorValidSamples, AuthorInvalidSamples, getAuthorErrors } from './Author.js'

test('Author valid samples match schema', async function () {
  for (const sample of AuthorValidSamples) {
    await expect(getAuthorErrors(sample)).resolves.toEqual([])
  }
})

test('Author invalid samples do not match schema', async function () {
  for (const sample of AuthorInvalidSamples) {
    await expect(getAuthorErrors(sample)).resolves.toContainEqual(expect.any(Object))
  }
})
