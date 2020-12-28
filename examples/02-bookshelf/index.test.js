import getHash from 'object-hash'
import { getContext, beforeAll as beforeAllTests, afterAll as afterAllTests, beforeEach as beforeEachTest, afterEach as afterEachTest } from './index.test.setup.js'
import { getLines, getSnapshot } from './index.test.ops.js'

describe('Bookself test suite', async function () {
  const context = await getContext()
  if (beforeAllTests) beforeAll(async function (...args) { return beforeAllTests(context, ...args) })
  if (afterAllTests) afterAll(async function (...args) { return afterAllTests(context, ...args) })
  if (beforeEachTest) beforeEach(async function (...args) { return beforeEachTest(context, ...args) })
  if (afterEachTest) afterEach(async function (...args) { return afterEachTest(context, ...args) })
  let lines = await getLines([], context)
  let stories = lines.map((line) => [line])
  while (stories.length) {
    let storiesNew = []
    for (const story of stories) {
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
    }
    stories = storiesNew
  }
})
