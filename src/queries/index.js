const client = require('../database/database');
// const newStudent = require('../../data');

let newStudent = []

const getStudents = async (req, res) => {
    try {
    const response = await client.query('SELECT table_schema,table_name FROM information_schema.tables;')

    if (response) {
    return res.status(200).json({ status: 'success', data: response.rows });
    }
} catch (err) {
    console.log(err.message);
}
};

const getStudentById = async(req, res) => {
    const { id } = req.params
    try {
        const findStudent = await client.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(findStudent.rows)
    } catch (err) {
        console.error(err.message);
    }
}

const createStudents = async (req, res) => {
    try {
        const { student_name, student_age, student_address } = req.body
        newStudent = await client.query("INSERT INTO users(name, age, address) VALUES($1, $2, $3) RETURNING *", 
        [student_name, student_age, student_address])
        res.json(newStudent.rows)
    } catch (err) {
        console.error(err.message);
    }
};



const insertStudents = async(req, res) => {
    try {
        const { id } = req.params //Where
        const {student_name, student_age, student_address} = req.body //set

        const updateStudent = await client.query("UPDATE users SET name = $1, age = $2, address = $3 WHERE id = $4 ", 
        [student_name, student_age, student_address, id]);
        res.json(" Data Updated")
    } catch (err) {
        console.error(err.message)    }

}

const deleteStudents = async(req, res) => {
    try {
        const { id } = req.params 

        const deleteStudent = await client.query("DELETE FROM users WHERE id = $1 ", [id]); //("SELECT * FROM users WHERE id = $1", [id])
        res.json(" Data deleted")
    } catch (err) {
        console.error(err.message)    }

}


module.exports = { getStudents, getStudentById, createStudents,  insertStudents, deleteStudents }
