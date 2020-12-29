exports.up = async function (knex) {
  await knex.schema.createTable('authors', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.timestamps()
  })
  await knex.schema.createTable('books', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.integer('authorId').unsigned().notNullable()
    table.foreign('authorId').references('id').inTable('authors')
    table.timestamps()
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('books')
  await knex.schema.dropTableIfExists('authors')
}
