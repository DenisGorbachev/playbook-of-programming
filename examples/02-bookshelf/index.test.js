import fc from 'fast-check'
import { createContext, destroyContext } from './test/context.js'

let context, knex

beforeEach(async function() {
  context = await createContext()
  knex = context.knex
})

afterEach(async function() {
  await destroyContext(context)
})

test('index', async function () {
  const allCommands = [
    // fc.integer().map(v => new PushCommand(v)),
    // fc.constant(new PopCommand()),
    // fc.constant(new SizeCommand()),
  ]
  // return fc.assert(
  //   fc.asyncProperty(fc.commands(allCommands, { maxCommands: 100 }), async cmds => {
  //     const s = () => ({ model: { num: 0 }, real: new List() })
  //     await fc.asyncModelRun(s, cmds)
  //   }),
  // )
})
