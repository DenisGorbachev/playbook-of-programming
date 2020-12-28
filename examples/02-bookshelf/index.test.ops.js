import { getStrings, multarr, ops } from './testgen/util.js'

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
  return [
    // multarr(['run'], [await getSubcommands()])
  ].concat(
    await getAuthorOperations(story, snapshot),
    await getBookOperations(story, snapshot),
  )
  // const event = story[story.length - 1]
  // switch (event.name) {
  //   case 'run':
  //     switch (true) {
  //       case '':
  //         return ['author', 'book']
  //       case 'author':
  //       case 'book':
  //         return ['add', 'update', 'remove', 'list']
  //       case 'author add':
  //         return final(await getAuthorNames())
  //       case 'author update':
  //         return await getAuthorNames()
  //       case 'author update "George Orwell"':
  //         return final(await getAuthorUpdateSet())
  //
  //     }
  //     break
  //   default:
  //     throw new Error(`Unrecognized event: "${event.name}"`)
  // }
}

async function getSubcommands() {
  return getStrings(['author', 'book'])
}

async function getAuthorOperations(story, snapshot) {
  return [].concat(
    await getAuthorAddOperations(),
    await getAuthorUpdateOperations(),
    await getAuthorRemoveOperations(),
    await getAuthorListOperations(),
  )
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
      return getAuthorNames().concat(['bogus name'])
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
  return getStrings(['"George Orwell"', '"Missing Author"'])
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

function escapeShellArgument(arg) {
  return '"' + arg.replace(/(["\s'$`\\])/g, '\\$1') + '"'
}

run.generator = async function * () {
  const commands = [].map((table) => {
  })
  for (const command of _.flattenDeep(commands)) {
    yield command
  }
}
