import { ApiError } from '../helpers/ApiError.js'
import { selectPinnedMovie, selectPinnedShow, insertPinnedMovie, insertPinnedShow, deletePinnedMovie, deletePinnedShow } from '../models/Pinned.js'


const getPinnedMovie = async (req, res, next) => {
    try {
        const response = await selectPinnedMovie(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}
const getPinnedShowtime = async (req, res, next) => {
    try {
        const response = await selectPinnedShow(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const postPinnedMovie = async (req, res, next) => {
    try {
        const response = await insertPinnedMovie(req.params.id, req.body.movie_id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}
const postPinnedShow = async (req, res, next) => {
    try {
        const response = await insertPinnedShow(req.params.id, req.body.movie_id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const removePinnedMovie = async (req, res, next) => {
    try {
        const response = await deletePinnedMovie(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

const removePinnedShow = async (req, res, next) => {
    try {
        const response = await deletePinnedShow(req.params.id)
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error)
    }
}

export { getPinnedMovie, getPinnedShowtime, postPinnedMovie, postPinnedShow, removePinnedMovie, removePinnedShow }