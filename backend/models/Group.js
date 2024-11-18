import { pool } from '../helpers/db.js'


const selectGroup = async (group_id) => {
    return await pool.query('Select * from user_group where id = $1', [group_id])
}

const selectAllGroups = async () => {
    return await pool.query('Select * from user_group')
}

const selectAllGroupsByUser = async (user_id) => {
    return await pool.query('Select * from user_group INNER JOIN account_user_group ON user_group.id = account_user_group.user_group_id WHERE account_user_group.account_id = $1', [user_id])
}

const insertGroup = async (group_name, user_id, description) => {
    return await pool.query('insert into user_group (group_name, owner_id, description) values ($1, $2, $3) returning *', [group_name, user_id, description])
}

const deleteGroup = async (group_id) => {
    return await pool.query('delete from user_group where id = $1 returning *', [group_id])
}



export { insertGroup, deleteGroup, selectGroup, selectAllGroups, selectAllGroupsByUser }