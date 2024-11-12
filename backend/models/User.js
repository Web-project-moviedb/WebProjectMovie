import { pool } from '../helpers/db.js'

const insertUser = async (username, hashedPassword) => {
    return await pool.query('insert into account (uname, password) values ($1, $2) returning *', [username, hashedPassword])
}

const selectUserByUsername = async (username) => {
    return await pool.query('select * from account where uname=$1', [username])
}

export { insertUser, selectUserByUsername }