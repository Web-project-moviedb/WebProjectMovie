import { ApiError } from '../helpers/ApiError.js'
import { insertGroup, deleteGroup, selectAllGroups, selectGroup, selectAllGroupsByUser } from '../models/Group.js'

//add group to database
const postGroup = async (req, res, next) => {
    try {
        const response = await insertGroup(req.body.name, req.body.id, req.body.desc)
        return res.status(201).json(response.rows[0]);
    } catch (error) {
        console.log(error)
    }
}

//Get all groups
const getAllGroups = async (req, res, next) => {
    try {
        const response = await selectAllGroups()
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

//Get Specific group
const getGroup = async (req, res, next) => {
    try {
        const response = await selectGroup(req.params.id)
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

//Get all groups for specific user_id
const getAllGroupsByUser = async (req, res, next) => {
    try {
        console.log(req.params)
        const response = await selectAllGroupsByUser(req.params.id)
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

const removeGroup = async (req, res, next) => {
    try {
        const response = await deleteGroup(req.params.id)
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

export { postGroup, getAllGroups, getGroup, getAllGroupsByUser, removeGroup }