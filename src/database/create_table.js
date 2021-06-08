const client = require('./database')

client.query(`CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(250), age INT, address VARCHAR(255))`)
