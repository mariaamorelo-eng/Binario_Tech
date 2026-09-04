exports.seed = async function(knex) {
  await knex('veiculos')
    .insert([
      { placa: 'MBB-3030', montadora: 'Mercedes-Benz', modelo: 'Actros 2651' },
      { placa: 'DAF-4040', montadora: 'DAF', modelo: 'XF 530' }
    ])
    .onConflict('placa')
    .ignore();
};
