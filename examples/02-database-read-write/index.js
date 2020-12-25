/**
 * This program provides subcommands to manage users.
 *
 * Event listeners:
 * - Run (default)
 * - Add user
 * - Show all users
 */

// TODO: How to add handling of invalid inputs?

/**
 * How to develop a program with stochastic effects?
 *
 * Notes:
 * - This is necessary because there are many actors in the system
 * - Program can't ensure the effects of its execution
 * - Result can arrive asynchronously (e.g. send an API request - receive an email)
 * - We need an "external test" + "multistage execution"
 *   - Run the test
 *   - Persist the results (to file / database / spreadsheet / ...)
 *
 * Outputs:
 * - Program (executable / file / ...)
 *   - Robust against failing effects (use retry?)
 *
 * - Inputs
 *   - Description (a text in natural language)
 *     - Scenarios
 */

const addEffects = {
  query: "INSERT INTO users VALUES (DEFAULT, 'alice@example.com', 'Alice', 'user')"
  log: ""
}

const runSamples = [
  'add alice@example.com Alice user',
  'add bob@example.com Bob admin',
  'show',
  'show alice',
  'show --by-name Alice',
  'show --by-name Ali'
]
