import getHash from 'object-hash'
import { createContext, beforeAll as beforeAllTests, afterAll as afterAllTests, createContext as beforeEachTest, destroyContext as afterEachTest, destroyContext } from './index.testgen.setup.js'
import { getOperations, getSnapshot } from './index.testgen.ops.js'

// TODO: IMPORTANT: See https://hypothesis.works/articles/rule-based-stateful-testing/

for (const process of getProcesses()) {
  test(getHash(process), async function () {
    const head = process.slice(0, -1)
    const tail = [process[process.length - 1]]
    const context = createContext()
    const resultHead = await run(head, context)
    const snapshotOld = await getSnapshot(context)
    const resultTail = await run(tail, context)
    const snapshotNew = await getSnapshot(context)
    await process.assert(resultTail, snapshotOld, snapshotNew, context)
    await destroyContext(context)
  })
}
