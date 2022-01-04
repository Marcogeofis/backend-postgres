const { Client } = require('pg');

async function getConnection(){
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'marco',
      password: 'admin321',
      database: 'postgres'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;
