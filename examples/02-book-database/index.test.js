const runSamples = [
  '',
  'add bob@example.com Bob admin',
  'show',
  'show alice',
  'show --by-name Alice',
  'show --by-name Ali'
]

let alice,

beforeEach(async function() {
  alice = new User()
})

test('Alice adds an author', async function() {
  alice.run('author add "George Orwell"')
})

test('Alice receives an error while adding a duplicate author', async function() {
  alice.run('author add "George Orwell"')
  alice.run('author add "George Orwell"')
})

test('Alice adds a book', async function() {
  alice.run('author add "George Orwell"')
  alice.run('book add "1984" "George Orwell"')
})
