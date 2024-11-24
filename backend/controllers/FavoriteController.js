import { response } from 'express'
import { ApiError } from '../helpers/ApiError.js'
import { selectAllFavoritesByUser, insertFavorite, deleteFavorite, selectAllUsersToFavorite } from '../models/Favorite.js'
import { pool } from '../helpers/db.js'

const getAllFavoritesByUser = async (req, res, next) => {
    try {
        const response = await selectAllFavoritesByUser(req.params.id)
        if(response.rows.length === 0){
            return res.status(404).json({message: 'no favorites found for this user'})
        }
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
        return next(error)
    }
}

const postFavorite = async (req, res, next) => {
    try {
        const response = await insertFavorite(req.body.user_id, req.body.movie_id, req.body.movie_name)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
        return next(error)
    }
}

const removeFavorite = async (req, res, next) => {
    try {
        const response = await deleteFavorite(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const getAllUsersToFavorite = async (req,res,next) => {
    try{
        const response = await selectAllUsersToFavorite()
        if(!response.rows.length === 0){
            return res.status(404).json({message: 'No users found'})
        }
        return res.status(200).json(response.rows)
    } catch(error) {
    console.log(error)
    return next(error)
    }
    
}

export { getAllFavoritesByUser, postFavorite, removeFavorite, getAllUsersToFavorite}