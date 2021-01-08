import { validateAuthor } from '../model/Author.js'
import { addAuthor } from './addAuthor.js'
import y from 'yargs'

export const yargs = y
  .scriptName('bookshelf')
  .usage('$0 <cmd> [args]')
  .command('author:add', 'Add a new author', (yargs) => {
    yargs.positional('name', {
      type: 'string',
    })
  }, async function (argv) {
    const authorProto = validateAuthor(argv)
    const author = addAuthor(authorProto)
    return `Added author "${author.name}"`
  })
  .command('author:remove', 'Remove an author by name', (yargs) => {
    yargs.positional('name', {
      type: 'string',
    })
  }, async function (argv) {

  })
  .command('author:update', 'Update an author by name', (yargs) => {
    yargs
      .positional('name', {
        type: 'string',
      })
      .option('name', {
        type: 'string',
        describe: 'new name',
      })
  }, async function (argv) {

  })
  .command('author:list', 'List authors, optionally filtered by name', (yargs) => {
    yargs
      .option('name', {
        type: 'string',
      })
  }, async function (argv) {

  })
  .command('book:add', 'Add a new book', (yargs) => {
    yargs
      .positional('name', {
        type: 'string',
      })
      .positional('author', {
        type: 'string',
      })
  }, async function (argv) {

  })
  .command('book:add', 'Add a new book', (yargs) => {
    yargs
      .positional('name', {
        type: 'string',
      })
      .positional('author', {
        type: 'string',
      })
  }, async function (argv) {

  })
  .demandCommand(1, 'Please specify command')
  .help()
