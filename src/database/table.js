const client = require('./database')

client.query(`CREATE TABLE bookstore (id SERIAL PRIMARY KEY, title VARCHAR(250), description VARCHAR(1000));`);
