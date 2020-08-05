import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host: '172.24.80.20',
        user: 'postgres',
        password: 'admin',
        database: 'proffy'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};
