# Playbook of Programming

**Spend less time on writing programs** with a Playbook of Programming. 

# Intro

Playbook saves your time by providing **a decision-making system** for common cases:

1. [How to write a program?](#write-a-program)
1. [How to write a function?](#write-a-function)
1. [How to model a real-world entity?](#model-a-real-world-entity)

# Use Cases

## Write a program

1. [Get users](#get-users) (min 3).
1. [Get use cases](#get-use-cases) (min 3 per user).
1. [Generate tests](#generate-tests).
1. [Write functions](#write-functions).
1. [Get user executions](#get-user-executions)
1. Loop to step 1 until you get what you want from users (typically money).

NOTE: Each program has an implicit "run" event listener, which is the program body. That's the place where you load configs, parse flags, check parameters, etc.

## Get users

1. Loop while you don't have enough users:
  1. Find a person who might be interested in using the program.
  1. Loop until the person accepts or rejects:
    1. Write a message:
      1. First message: "I'm developing a program to do X. Do you want to try it as soon as it's available?".
      1. Second & other messages: rewrite the first message in a different way (for example: list incentives).
        1. Note: if the person doesn't reply or replies inconclusively, continue asking.
    1. Send the message to the person.
    1. Set timeout to 1 day.

## Get use cases

1. For each user:
  1. Ask the user: "What should the program do? In other words, what are your use cases?"
  1. Loop until:
    1. You understand all use cases.
    1. You have extracted all use cases from the user.

## Write an event definition

1. Write event name.
1. Write event parameter definitions

## Generate tests

1. Run test generator.
1. Check the generated test:
  1. If the test is valid: implement it.
  1. If the test duplicates another test: write a test filter function to prevent the generator from creating such tests. 

## Write a story

Convert a vague use case to a specific story:

1. Validate each line:
  1. Start with actor name.
  1. Use present simple tense.

## Write functions

1. For each test suite:
  1. [Write a function](#write-a-function) that passes all tests in a test suite.

## Write a function

1. [Write name](#write-a-function-name)
1. [Write output definitions](#write-output-definitions).
1. [Write input definitions](#write-input-definitions).
1. [Write tests](#write-tests).
1. [Write operations](#write-operations) until the tests are passing.

## Write a function name

* If the function is an event listener: `on${EventName}`
  * `onRun`
  * `onClick`
* If the function is a read operation: `get${OutputName}`
  * `getUserId`
* If the function is a write operation: `${verb}${OutputName}` ([choose a verb](#choose-a-verb))
  * `setUserId`
  * `deleteUserById`
  
## Get user executions

## Model a real-world entity

## Write output definitions

For each independent [output](#output):

1. Write 3 samples:
  1. Find a real-world entity.
  1. Write a [value](#value) of this entity (e.g. plain object / dict / map).
1. [Write a schema](#write-a-schema) that describes that entity.
  1. If you can't write a schema (stuck for 15 minutes): go back to point #1 (get more entities).

NOTE: If the outputs are not independent (e.g. roots of the same quadratic equation), then define then as a single aggregate output (e.g. an array of numbers).

## Write input definitions

1. Write independent [input](#input) names:
  1. If the inputs are not independent (e.g. a set of coefficients of the same quadratic equation), then define then as a single aggregate input (e.g. an array of numbers).
1. For each independent [input](#input):
  1. Write 3 samples:
    1. Find a real-world entity.
    1. Write a model of this entity with specific fields & values (e.g. plain object / dict / map).
  1. Write a schema that describes that entity.
    1. If you can't write a schema (stuck for 15 minutes): go back to point #1 (get more entities).

NOTE: An input of one function may be an output of another function.

## Write tests

1. For each output sample:
  1. Find or write a matching input sample.

NOTE: Mock external dependencies.

## Write operations

1. Write default operations:
  1. Validate inputs according to definitions.
  1. Validate outputs according to definitions.
1. If you can write the operations right away, do it.
1. If you can't write the operations right away:
  1. Try to find the operations via Google.
  1. Try to write high-level operations (which will become functions)
    1. [Choose first matching](#choose-first-matching) basic body schema: `iteration`, `modification`, `combination`, `calculation`.
    1. Choose the higher-level body schema:
      1. Examples:
        1. `getWebsite`
        1. `getProduct` (with feedback loop)

## Meta-instructions

### Choose first matching

* Define minimal acceptance tests.
* Choose first that passes the tests.

The input array is expected to be sorted. If not, add a sorting operation 

### Choose a verb

* [Choose first matching](#choose-first-matching) from preferred verbs:
  * `get`
  * `set`
  * `add`
  * `remove`
  * `update`
  * `delete`
* If none of above match your case: choose any verb. 

## Definitions

### Entity

A real-world entity.

* You
* Your house
* Your future house (there's a Playbook for that...)
* A car
* A dog

### Value

* `1`
* `2.0`
* `true`
* `{name: 'Alice'}`
* `[{name: 'Alice'}, {name: 'Bob'}]`

### Object

A value that represents an entity.

* User model (simple): `{name: 'Alice'}`
* User model (complex): `{id: 1, name: 'Alice', surname: 'Williams', createdAt: new Date('2020-12-24T21:05:00Z')}` 

### Schema

A value that represents an [object](#object) ([JSON Schema](https://json-schema.org/)).

* User schema (simple) `{type: 'object', properties: {name: {type: 'string', minLength: 1}}}`
* User schema (complex) `{type: 'object', properties: {id: {type: 'integer'}, name: {type: 'string', minLength: 1}}}`

### Event listener

### Output

* A return value
  * `1`
  * `true`
  * `{name: 'Alice'}`
* A screen output
  * `What you're reading right now`
* A database modification (described by insert / update / delete query)
  * `INSERT INTO users(name) VALUES ('Alice')`
* An API call (described by call arguments)
  * `{method: 'POST', url: 'https://api.twitter.com/1.1/statuses/update.json', params: {status: 'just setting up my twttr'}}`
  
NOTE: In tests, the output values to external APIs are collected via mocks.

### Input

* A plain value
  * `1`
  * `true`
  * `{name: 'Alice'}`
* A user input (e.g. mouse button number)
  * `2`
* A database query (select, describe)
  * `SELECT * FROM users`
* An API read call (described by call arguments)
  * `{method: 'GET', url: 'https://api.twitter.com/1.1/statuses/user_timeline.json'}`

### Story

# Philosophy

1. Every problem can be reduced to a sequence of problems: write a program, execute a program.
  1. Even when we're doing physical work, our brain "plans" this work by imagining the necessary actions. 
1. Start from goal & design backwards (outputs -> inputs -> tests -> operations).
1. Start from high-level picture, refine to low-level details (high-level functions -> low-level functions).
  1. Fill the high-level picture completely, then move to low-level details (write all operations of high-level function -> for each operation: write an implementation).
1. We build programs from elementary operations because it's faster to memorize elementary results + perform a computation than to memorize the result of each computation.
  1. Example:
    1. We memorize the summation table from 1 to 10.
    1. We memorize the multiplication table from 1 to 10.
    1. We compute 64 * 321 using a sequence of elementary multiplications & summations.

## Start from goal

* It's faster to build something according to the specification (if it's available).
  * If you're writing a multiplayer game - then write a multiplayer game (not a singleplayer game with multiplayer functionality added as an afterthought)
* If the specification isn't available (e.g. startups), then your task is to get the specification must 
