const client = require('../database/database');


let newBook = []

const getBook = async (req, res) => {
    try {
    const response = await client.query('SELECT * FROM bookstore ORDER BY id ASC')

    if (response) {
    return res.status(200).json({ status: 'success', data: response.rows });
    }
} catch (err) {
    console.log(err.message);
}
};

const getBookById = async(req, res) => {
    const { id } = req.params
    try {
        const findBook = await client.query("SELECT * FROM bookstore WHERE id = $1", [id]);
        res.json(findBook.rows)
    } catch (err) {
        console.error(err.message);
    }
}

const createNewBook = async (req, res) => {
    try {
        const { title, description } = req.body
        newBook = await client.query("INSERT INTO bookstore (title, description) VALUES($1, $2) RETURNING *", 
        [title, description])
        res.json(newBook.rows)
    } catch (err) {
        console.error(err.message);
    }
};



const insertNewBook = async(req, res) => {
    try {
        const { id } = req.params //Where
        const { title, description } = req.body //set

        const updateBook = await client.query("UPDATE bookstore SET title = $1, description = $2 WHERE id = $3 ", 
        [title, description , id]);
        res.json(" Data Updated")
    } catch (err) {
        console.error(err.message)    }

}

const deleteBook = async(req, res) => {
    try {
        const { id } = req.params 

        const deleteBooks = await client.query("DELETE FROM bookstore WHERE id = $1 ", [id]); 
        res.json(" Data deleted")
    } catch (err) {
        console.error(err.message)    }

}


module.exports = { getBook, 
    getBookById, 
    createNewBook,  
    insertNewBook, 
    deleteBook }
