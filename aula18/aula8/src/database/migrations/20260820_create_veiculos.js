exports.up = function(knex) {
  return knex.schema.createTable('veiculos', (table) => {
    table.increments('id').primary();
    table.string('modelo').notNullable();
    table.string('placa').notNullable();
    table.string('status').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('veiculos');
};
