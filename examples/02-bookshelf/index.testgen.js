import getHash from 'object-hash'
import { getContext, beforeAll as beforeAllTests, afterAll as afterAllTests, beforeEach as beforeEachTest, afterEach as afterEachTest } from './index.testgen.setup.js'
import { getOperations, getSnapshot } from './index.testgen.ops.js'

(async function () {
  const context = await getContext()
  beforeAllTests && await beforeAllTests(context)
  let operations = await getOperations([], context)
  let processes = operations.map((op) => [op])
  console.log('stories', processes);
  while (processes.length) {
    let storiesNew = []
    for (const story of processes) {
      beforeEachTest && await beforeEachTest(context)
      // TODO: Important: ensure that all `test` calls finish before the next iteration on `stories`
      test(getHash(story), async function () {
        // FIXME: Optimize the story by preloading the database?
        const head = story.slice(0, -1)
        const tail = [story[story.length - 1]]
        const resultHead = await run(head, context)
        const snapshotOld = await getSnapshot(context)
        const resultTail = await run(tail, context)
        const snapshotNew = await getSnapshot(context)
        await story.assert(resultTail, snapshotOld, snapshotNew, context)
        let linesNew = await getOperations(story, snapshotNew, context)
        storiesNew = storiesNew.concat(linesNew.map((line) => story.concat(line)))
      })
      afterEachTest && await afterEachTest(context)
    }
    processes = storiesNew
  }
  afterAllTests && await afterAllTests(context)
})()
  .then(console.log)
  .catch(console.error)
