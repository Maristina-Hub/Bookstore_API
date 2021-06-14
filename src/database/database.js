const pkg = require('pg');
const dotenv = require('dotenv').config()

//dotenv helps hode our environmental variable 

const { Pool } = pkg

const client = new Pool ({
    user: process.env.DATABASE_USER,
    host: 'localhost',
    username: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5433
});

client.on('connect', () => console.log('Database connected sucessfully'));

client.on('error', (err) => console.log(`Error: ${err}`))

module.exports = client