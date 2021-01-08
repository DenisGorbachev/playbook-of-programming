import getHash from 'object-hash'
import { createContext, beforeAll as beforeAllTests, afterAll as afterAllTests, createContext as beforeEachTest, destroyContext as afterEachTest } from './test/context.js'
import { getOperations, getSnapshot } from './index.testgen.ops.js'

/**
 * Stop when:
 * Snapshot contains an error
 * Snapshot is equal to an existing snapshot (using fuzzy matchers)
 * Snapshot `shouldContinue` returns false
 */

(async function () {
  const context = await createContext()
  const snapshot = await getSnapshot(context)
  let operations = await getOperations([], snapshot, context)
  let processes = operations.map((op) => [op])
  while (processes.length) {
    let storiesNew = []
    for (const story of processes) {
      const hash = getHash(story)
      console.log('story', story)
      // TODO: Important: ensure that all `test` calls finish before the next iteration on `stories`
      // FIXME: Optimize the story by preloading the database?
      const head = story.slice(0, -1)
      const tail = [story[story.length - 1]]
      const context = createContext()
      const resultHead = await run(head, context)
      const snapshotOld = await getSnapshot(context)
      const resultTail = await run(tail, context)
      const snapshotNew = await getSnapshot(context)
      await story.assert(resultTail, snapshotOld, snapshotNew, context)
      let linesNew = await getOperations(story, snapshotNew, context)
      storiesNew = storiesNew.concat(linesNew.map((line) => story.concat(line)))
      await destroyContext(context)
    }
    processes = storiesNew
  }
  afterAllTests && await afterAllTests(context)
})()
  .then(console.log)
  .catch(console.error)
