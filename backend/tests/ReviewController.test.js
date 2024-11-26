import { expect } from 'chai'
import { initializeTestDB } from '../helpers/test.js'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const base_url = process.env.BACKEND_URL
console.log("Base URL: ", base_url)

describe('GET reviews', () => {

    before(async() => {
        await initializeTestDB()
    })

    it ('should returns all reviews in db', async () => {

        const response = await axios.get(base_url + '/reviews')
        const reviews = response.data // this is .data and not .json because we are using axios

        expect(response.status).to.equal(200)
        expect(reviews).to.be.an('array').that.is.not.empty
        expect(reviews[0]).to.include.all.keys('id', 'account_id', 'movie_id', 'review_title', 'review_body', 'stars', 'created_at')
    })

})