import { expect } from 'chai'
import { initializeTestDB, insertTestUser, getToken } from '../helpers/test.js'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const base_url = process.env.BACKEND_URL
console.log("Base URL: ", base_url)

describe('POST register account', () => {

    before(async() => {
        await initializeTestDB()
    })

    it ('should create an account with valid email and password', async() => {
        const response = await axios.post(base_url + '/user/register', {
            username: 'testuser',
            password: 'Testuser123'
        })

        const data = await response.data
        expect(response.status).to.equal(201)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
})

// describe('DELETE delete account', () => {})

// describe('POST login', () => {})



//describe('XX logout', () => {})