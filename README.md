# Playbook of Programming

**Spend less time on writing programs** with a Playbook of Programming. 

# Intro

Playbook saves your time by providing **a decision-making system** for common questions:

1. [How to write a program?](#write-a-program)
1. [How to write a function?](#write-a-function)
1. [How to model a real-world entity?](#model-a-real-world-entity)

# Use Cases

## Write a program

1. [Get users](#get-a-user) (min 3).
1. [Get use cases](#get-a-user-dream) (min 3 per user).
1. [Write event definitions](#write-a-story).
1. [Generate event sequences](#generate-event-sequences).
1. [Write event listeners](#write-an-event-listener).
1. [Get user executions](#get-user-executions)
1. Loop to step 1 until you get what you want from users (typically money).

NOTE: Each program has an implicit "run" event listener, which is the program body. That's the place where you load configs, parse flags, check parameters, etc.

## Get a user

1. Find a person who might be interested in using the program.
1. Ask the person: "I'm developing a program to do X. Do you want to try it as soon as it's available?"
1. Loop until any:
  1. Person accepts.
  1. Person rejects.

NOTE: If the person doesn't respond, rewrite the message in a different way & send it again.

## Get a use case

1. Ask the user: "What should the program do? In other words, what are your use cases?"
1. Loop until all:
  1. You can understand all use cases.
  1. User has provided all use cases OR User can't provide more use cases because he's tired.

## Write a story

Convert a vague use case to a specific story:

1. Validate each line:
  1. Start with actor name.
  1. Use present simple tense.

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

1. Start from goal & design backwards (outputs -> inputs -> tests -> operations).
1. Start from high-level picture, refine to low-level details (high-level functions -> low-level functions).
  1. Fill the high-level picture completely, then move to low-level details (write all operations of high-level function -> for each operation: write an implementation).

## Start from goal

* It's faster to build something according to the specification (if it's available).
  * If you're writing a multiplayer game - then write a multiplayer game (not a singleplayer game with multiplayer functionality added as an afterthought)
* If the specification isn't available (e.g. startups), then your task is to get the specification must 
