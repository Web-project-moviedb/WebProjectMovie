import { pool } from '../helpers/db.js'


const selectPinnedMovie = async (group_id) => {
    return await pool.query('Select * from pinnedmovie where group_id = $1', [group_id])
}
const selectPinnedShow = async (group_id) => {
    return await pool.query('Select * from pinnedshow where group_id = $1', [group_id])
}

const insertPinnedMovie = async (group_id, movie_id) => {
    return await pool.query('insert into pinnedmovie (group_id, movie_id) values ($1, $2) returning *', [group_id, movie_id])
}

const insertPinnedShow = async (group_id, movie_id) => {
    return await pool.query('insert into pinnedshow (group_id, movie_id) values ($1, $2) returning *', [group_id, movie_id])
}

const deletePinnedMovie = async (pinned_id) => {
    return await pool.query('delete from pinnedmovie WHERE id = $1 returning *', [pinned_id])
}

const deletePinnedShow = async (pinned_id) => {
    return await pool.query('delete from pinnedshow WHERE id = $1 returning *', [pinned_id])
}

export { selectPinnedMovie, selectPinnedShow, insertPinnedMovie, insertPinnedShow, deletePinnedMovie, deletePinnedShow }