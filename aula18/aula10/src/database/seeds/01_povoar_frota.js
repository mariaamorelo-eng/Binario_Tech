/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('veiculos').del();
  await knex('veiculos').insert([
    { placa: 'SCA-2020', montadora: 'Scania', modelo: 'R500' }
  ]);
};
