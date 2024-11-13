import { hash, compare } from 'bcrypt'
import { insertUser, selectUserByUsername } from '../models/User.js'
import jwt from 'jsonwebtoken'

const { sign } = jwt

// Add user to database
const postRegistration = async (req, res) => {
    try {
        // ACHTUNG! Error handling must be updated later with ApiError handler
        if (!req.body.username || req.body.username.length === 0) return Error     // Input for username is empty
        if (!req.body.password || req.body.password.length < 8) return Error       // Input for password is too short

        const hashedPassword = await hash(req.body.password, 10)
        const userFromDb = await insertUser(req.body.username, hashedPassword)
        const user = userFromDb.rows[0]
        return res.status(201).json(createUserObject(user.id, user.username))
    } catch (error) {
        console.log(error)
    }
}

// Create UserObject
const createUserObject = (id, username, token = undefined) => {
    return {
        'id': id,
        'username': username,
        ...(token !== undefined) && { 'token': token }
    }
}

// Login
const postLogin = async (req, res) => {
    try {
        // ACHTUNG! Error handling must be updated later with ApiError handler
        const userFromDb = await selectUserByUsername(req.body.username)
        if (userFromDb.rowCount === 0) return console.log("Cant find userdata")                         // Cant find data for user

        const user = userFromDb.rows[0]
        if (!await compare(req.body.password, user.password)) return Error                              // Password doesn't match

        const token = sign(req.body.username, process.env.JWT_SECRET_KEY)
        return res.status(200).json(createUserObject(user.id, user.uname, token))
    } catch (error) {
        console.log(error)
    }
}

export { postRegistration, postLogin }