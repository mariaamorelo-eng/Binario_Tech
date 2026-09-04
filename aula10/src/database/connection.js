const knex = require('knex')({
  client: 'better-sqlite3', // altere de 'sqlite3' para 'better-sqlite3'
  connection: {
    filename: './src/database/db.sqlite' // ou o caminho do seu arquivo .sqlite
  },
  useNullAsDefault: true
});

module.exports = knex;
