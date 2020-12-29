import { AuthorValidSamples, validateAuthor } from './Author.js'

test('Author samples match schema', async function() {
  for (const sample of AuthorValidSamples) {
    const value = await validateAuthor(sample)
    expect(value).toBeDefined()
  }
})
