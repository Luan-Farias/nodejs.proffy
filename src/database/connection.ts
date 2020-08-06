import knex from 'knex';
const dbConfig = require('../../knexfile');

const db = knex(dbConfig);

export default db;
