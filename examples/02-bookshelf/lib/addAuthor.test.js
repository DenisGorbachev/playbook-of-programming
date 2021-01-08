import fc from 'fast-check'
import { createContext, destroyContext } from '../test/context.js'
import { addAuthor } from './addAuthor.js'

let context, knex

beforeEach(async function() {
  context = await createContext()
  knex = context.knex
})

afterEach(async function() {
  await destroyContext(context)
})

test('addAuthor', async function () {
  await fc.assert(
    fc.asyncProperty(
      fc.record({ name: fc.string() }),
      fc.context(),
      (author, fcctx) => {
        addAuthor(author, knex)
      }
    ),
  )
})
