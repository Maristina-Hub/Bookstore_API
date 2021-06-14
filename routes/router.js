const express = require('express');
const router = express.Router()

const{ getBook, 
    getBookById, 
    createNewBook,  
    insertNewBook, 
    deleteBook } = require('../src/queries/user')

router.get('/', getBook)

router.get('/books/:id', getBookById)

router.post('/books/add', createNewBook)

router.put('/books/:id', insertNewBook)

router.delete('/books/:id', deleteBook)



module.exports = router 