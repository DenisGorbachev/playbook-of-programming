export async function getSchemaErrors(objects, schema) {
  return compact(Promise.all(snapshot.authors.map(author => validateAuthor(author))))
}
