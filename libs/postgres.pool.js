const { Pool } = require('pg');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({connectionString: URI});
//en la variable URI quedara guardada todos los datos de abajo.

// host: 'localhost',
// port: 5432,
// user: 'marco',
// password: 'admin321',
// database: 'postgres'


module.exports = pool;
