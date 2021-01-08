import { validateAuthor } from '../model/Author.js'

export async function addAuthor(author, knex) {
  return knex('authors').insert(author).returning('*')
}
