export const beforeAll = async function (context) {
  const { knex } = context
  await knex.migrate.latest()
  await knex.seed.run()
}

export const afterAll = async function () {
  const { knex } = context
}

export async function getContext() {
  const knex = null
  return { knex }
}
