import { pool } from '../helpers/db.js'

// Insert user
const insertUser = async (username, hashedPassword) => {
    return await pool.query('insert into account (uname, password) values ($1, $2) returning *', [username, hashedPassword])
}

// Select user by username
const selectUserByUsername = async (username) => {
    return await pool.query('select * from account where uname=$1', [username])
}

// Delete user by id, this delete also automatically favourites and reviews by user
const deleteUserById = async (id) => {
    return await pool.query('delete from account where id=$1 returning *', [id])
}

// Select all groups by user
const selectAllGroupsByUser = async (user_id) => {
    return await pool.query('Select * from user_group INNER JOIN account_user_group ON user_group.id = account_user_group.user_group_id WHERE account_user_group.account_id = $1', [user_id])
}


export { insertUser, selectUserByUsername, deleteUserById, selectAllGroupsByUser }
