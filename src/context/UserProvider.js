import React from 'react'
import { useState } from 'react'
import { UserContext } from './UserContext.js'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL

export default function UserProvider({ children }) {
    const [user, setUser] = useState({ username: '', password: '' })   // Save user and password to use for login
    const [token, setToken] = useState(null)                           // Save token to use for authentication

    // Login user API call
    const login = async () => {
        const headers = {headers: { 'Content-Type': 'application/json' }}
        const data = {username: user.username, password: user.password}

        try {
            const response = await axios.post(url + 'user/login', data, headers)
            const { id, username: uname, token } = response.data
            setUser({ id, username: uname})                            // Save id and username to user
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
            setUser({username: '', password: ''})                       // Set user and password fields empty
        } catch (error) {
            throw error
        }
    }

    // Logout user
    const logout = () => {
        setUser({ id: null, username: '', password: '' })               // Set user and password fields empty
        setToken(null)                                                  // Set token to null
    }
    return (
        <UserContext.Provider value={{ user, setUser, register, login, logout, token }} >
            {children}
        </UserContext.Provider>
    )
}