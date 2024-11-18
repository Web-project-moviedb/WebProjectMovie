import { pool } from '../helpers/db.js'

const insertUser = async (username, hashedPassword) => {
    return await pool.query('insert into account (uname, password) values ($1, $2) returning *', [username, hashedPassword])
}

const selectUserByUsername = async (username) => {
    return await pool.query('select * from account where uname=$1', [username])
}

// Delete user by id, this delete also automatically favourite(s) and review(s) by user
const deleteUserById = async (id) => {
    return await pool.query('delete from account where id=$1 returning *', [id])
}


export { insertUser, selectUserByUsername, deleteUserById }