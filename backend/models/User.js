import { pool } from '../helpers/db.js'

const insertUser = async (username, hashedPassword) => {
    return await pool.query('insert into account (uname, password) values ($1, $2) returning *', [username, hashedPassword])
}

// Select user by username
const selectUserByUsername = async (username) => {
    return await pool.query('select * from account where uname=$1', [username])
}

// Delete user by id, this delete also automatically favourite(s) and review(s) by user
const deleteUserById = async (id) => {
    return await pool.query('delete from account where id=$1 returning *', [id])
}

// Select user by group id
const selectUserByGroup = async (group_id) => {
    return await pool.query('select account_user_group.account_id, account_user_group.user_group_id, account_user_group.pending, account.uname from account INNER JOIN account_user_group ON account.id = account_user_group.account_id INNER JOIN user_group ON account_user_group.user_group_id = user_group.id WHERE user_group.id = $1', [group_id])
}
export { insertUser, selectUserByUsername, deleteUserById, selectUserByGroup }
