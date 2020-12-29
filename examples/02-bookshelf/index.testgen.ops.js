import { getStrings, multarr, ops } from './testgen-ext/util.js'

export async function * getStories(context) {
  const { knex } = context
}

export const getSnapshot = async function (context) {
  const { knex } = context
  return {
    authors: await knex('authors').select(),
    books: await knex('books').select(),
  }
}

export async function getOperations(story, snapshot, context) {
  return Array.prototype.concat(
    await getAuthorOperations(story, snapshot),
    await getBookOperations(story, snapshot),
  )
}

async function getSubcommands() {
  return getStrings(['author', 'book'])
}

async function getAuthorOperations(story, snapshot) {
  return Array.prototype.concat(
    await getAuthorAddOperations(story, snapshot),
    await getAuthorUpdateOperations(story, snapshot),
    await getAuthorRemoveOperations(story, snapshot),
    await getAuthorListOperations(story, snapshot),
  )
}

async function getBookOperations(story, snapshot) {
  return []
}

async function getAuthorAddOperations(story, snapshot) {
  const multargs = []
  for (const name of await getAuthorNames(story, snapshot)) {
    multargs.push([name])
  }
  return ops('addAuthor', multargs)
}

async function getAuthorUpdateOperations(story, snapshot) {
  const multargs = []
  multargs.push(['Missing Name', { name: 'Not Really Updated Name' }])
  for (const name of await getAuthorNamesFromSnapshot(story, snapshot)) {
    for (const update of await getAuthorUpdates()) {
      multargs.push([name, update])
    }
  }
  return ops('updateAuthor', multargs)
}

async function getAuthorRemoveOperations(story, snapshot) {
  const multargs = []
  multargs.push(['Missing Name'])
  for (const name of await getAuthorNamesFromSnapshot(story, snapshot)) {
    multargs.push([name])
  }
  return ops('removeAuthor', multargs)
}

async function getAuthorListOperations() {
  const multargs = []
  for (const field of await getAuthorFields()) {
    for (const value of await getAuthorSelectorValues(field)) {
      multargs.push([field, value])
    }
  }
  return ops('getAuthors', multargs)
}

async function getAuthorFields() {
  return ['', 'bogus', 'name']
}

async function getAuthorSelectorValues(field) {
  switch (field) {
    case 'name':
      return (await getAuthorNames()).concat(['bogus name'])
    default:
      return ['bogus']
  }
}

function final(expansions) {
  expansions.__final = true
}

async function getAuthorNamesFromSnapshot(story, snapshot) {
  return snapshot.authors.map((author) => author.name)
}

async function getAuthorNames() {
  return getStrings(['George Orwell', 'Missing Author'])
}

async function getAuthorUpdateSet() {
  return getUpdates({ name: 'Lacey Austin' })
}

async function getAuthorUpdates() {
  return getUpdates({ name: await getAuthorNames() })
}

async function getUpdates(fields) {
  const fieldsWithDefault = _.defaults(fields, { missingField: 2 })
  return Object.getOwnPropertyNames(fieldsWithDefault).map((key) => `--set ${key}=${escapeShellArgument(fields[key])}`)
}
