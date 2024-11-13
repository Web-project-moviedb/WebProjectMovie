import React from 'react'
import { useState } from 'react'
import { UserContext } from './UserContext.js'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL

export default function UserProvider({ children }) {
    const userFromSessionStorage = sessionStorage.getItem('user')
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : { username: '', password: '' })  // Save user and password to use for login
    const [token, setToken] = useState(null)        // Save token to use for authentication

    // Login user API call
    const login = async () => {
        const headers = {headers: { 'Content-Type': 'application/json' }}
        const data = {username: user.username, password: user.password}
        try {
            const response = await axios.post(url + 'user/login', data, headers)

            if (!response.data) return console.log("No data returned") // No data returned

            const { id, username: uname, token } = response.data
            setUser({ id, username: uname})                            // Save all account data to user
            setToken(token)                                            // Save token to token
        } catch (error) {
            setUser({ username: '', password: '' })                    // Set user and password fields empty
            throw error
        }
    }

    // Register user API call
    const register = async () => {
        const headers = {headers: {'Content-Type': 'application/json'}}
        const data = {username: user.username, password: user.password}
        try {
            await axios.post(url + 'user/register', data, headers)

            setUser({username: '', password: ''})   // Set user and password fields empty
        } catch (error) {
            throw error
        }
    }
    return (
        <UserContext.Provider value={{ user, setUser, register, login, token }} >
            {children}
        </UserContext.Provider>
    )
}