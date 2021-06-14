const express = require('express')
const cors = require('cors')
const client = require('./database/database')
const books = require('../routes/router')

const app = express()
const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json())

client.connect()

app.use('/', books)
app.use('/books/add', books)
app.use('/books/:id', books)



app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})