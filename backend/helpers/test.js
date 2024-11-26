import fs from 'fs'
import path from 'path'
import { pool } from '../db.js'
import { hash } from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } = pkg

import dotenv from 'dotenv'
dotenv.config()

const __dirname = import.meta.dirname

const initializeTestDB = async () => {
    console.log('Initializing test database')
    const sql = fs.readFileSync(path.resolve(__dirname, 'movieapp_test.sql')).toString()    // read the test db sql file
    await pool.query(sql)   // execute the sql
    console.log('Test database initialized')
}

const insertTestUser = async (uname, password) => {
    console.log('Inserting test user: ' +uname)
    const hashedPassword = await hash(password, 10)
    await pool.query('insert into account (uname, password) values ($1, $2)', [uname, hashedPassword])
    console.log('Test user inserted: ' +uname)
}

const getToken = async (id) => {
    const key = process.env.JWT_SECRET_KEY
    return sign({account: id}, key) // create a token with user id and secret key
}

export { initializeTestDB, insertTestUser, getToken }