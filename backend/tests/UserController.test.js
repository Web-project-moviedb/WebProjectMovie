import { expect } from 'chai'
import { initializeTestDB, insertTestUser, getToken } from '../helpers/test.js'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const base_url = process.env.BACKEND_URL + '/user'
console.log("Base URL: ", base_url)

// note: custom errror messages in UserController.js must match the test error messages exactly
// note: tests that SHOULD return an error must be in a try-catch block because axios will automatically throw an error and terminate the test if the status code is not 2xx

describe('POST register account', () => {

    before(async() => {
        await initializeTestDB()
    })

    it ('should create an account with valid email and password', async() => {
        const response = await axios.post(base_url + '/register', {
            username: 'testuser',
            password: 'Testuser123'
        })

        const data = await response.data
        expect(response.status).to.equal(201)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it ('should not create an account with < 8 character password', async() => {
        
        try {
            const response = await axios.post(base_url + '/register', {
                username: 'testuser',
                password: 'Short1'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Password length must be at least 8 characters')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

    it ('should not create an account without capital letters in password', async() => {
        try {
            const response = await axios.post(base_url + '/register', {
                username: 'testuser',
                password: 'testuser123'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Password must include at least one uppercase letter and one number')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

    it ('should not create an account without numbers in password', async() => {
        try {
            const response = await axios.post(base_url + '/register', {
                username: 'testuser',
                password: 'Withoutnumbers'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Password must include at least one uppercase letter and one number')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

    it ('should not create an account with an empty username', async() => {
        try {
            const response = await axios.post(base_url + '/register', {
                username: '',
                password: 'Testuser123'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Invalid username')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

    it ('should not create an account with username as password', async() => {
        try {
            const response = await axios.post(base_url + '/register', {
                username: 'Testuser123',
                password: 'Testuser123'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Username and password must be different')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

    it ('should not create an account with an existing username', async() => {
        try {
            const response = await axios.post(base_url + '/register', {
                username: 'testuser',
                password: 'Testuser123'
            })
    
            const data = response.data
            expect(response.status).to.equal(400)
            expect(data).to.be.an('object')
            expect(data).to.have.property('error', 'Username already exists')
        } catch (error) {
            // console.error('Error:', error.response ? error.response.data : error.message)
        }
    })

})

// describe('DELETE delete account', () => {

//     before(async() => {

//     })

// })

// describe('POST login', () => {})



//describe('XX logout', () => {})