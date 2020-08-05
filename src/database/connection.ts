import knex from 'knex';

const db = knex({
    client: 'pgsql',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'proffy'
    }
});

export default db;
