exports.up = function(knex) {
  return knex.schema.createTable('motoristas', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cnh').unique().notNullable();
    table.string('categoria').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('motoristas');
};
