import { hash, compare } from 'bcrypt'
import { insertUser, selectUserByUsername, deleteUserById } from '../models/User.js'
import { ApiError } from '../helpers/ApiError.js'
import jwt from 'jsonwebtoken'

const { sign } = jwt

// Add user to database
const postRegistration = async (req, res, next) => {
    try {
        // Username validation
        if (!req.body.username || req.body.username.length === 0) return next(new ApiError('Invalid username', 400))    // Input for username is empty
        if (!req.body.username.length > 50) return next(new ApiError('Username is too long', 400))    // Input for username is too long
        if (/\s/.test(req.body.username)) return next(new ApiError('Username cannot contain spaces', 400))    // Username contains spaces

        // Password validation
        if (!req.body.password || req.body.password.length < 8) return next(new ApiError('Password length must be at least 8 characters', 400))     // Input for password is too short
        if (req.body.password.match(/^(?=.*[A-Z])(?=.*[0-9])/) === null) return next(new ApiError('Password must include at least one uppercase letter and one number', 400))
        if (req.body.password === req.body.username) return next(new ApiError('Username and password must be different', 400))    // Username and password are the same

        // Check if user exists
        const userExists = await selectUserByUsername(req.body.username)
        if (userExists.rowCount > 0) return next(new ApiError('Username already exists', 400))
            
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
const postLogin = async (req, res, next) => {
    const invalid_credentials_message = 'Invalid username or password'
    try {
        const userFromDb = await selectUserByUsername(req.body.username)
        if (userFromDb.rowCount === 0) return next(new ApiError(invalid_credentials_message), 401)   // User not found

        const user = userFromDb.rows[0]
        if (!await compare(req.body.password, user.password)) return next(new ApiError(invalid_credentials_message, 401))  // Passwords do not match

        const token = sign(req.body.username, process.env.JWT_SECRET_KEY)
        return res.status(200).json(createUserObject(user.id, user.uname, token))
    } catch (error) {
        console.log(error)
    }
}

// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const id = parseInt(req.body.id)
        if (!id) return next(new ApiError('Invalid id', 400))
        return res.status(200).json(await deleteUserById(id))
    } catch (error) {
        console.log(error)
    }
}

export { postRegistration, postLogin, deleteUser }