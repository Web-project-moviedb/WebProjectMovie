import React from 'react'
import { useState, useEffect } from 'react'
import { UserContext } from './UserContext.js'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL

export default function UserProvider({ children }) {
    // Get user and token from session storage
    const storedUser = sessionStorage.getItem('user')
    const storedToken = sessionStorage.getItem('token')

    // Initialize user and token states with session storage values
    const [user, setUser] = useState(() => {
        return storedUser ? JSON.parse(storedUser) : { id: null, username: '' }
    })
    const [token, setToken] = useState(() => {
        return storedToken || null
    })

    useEffect(() => {
        // Refresh the session storage when user or token changes
        if (user.id) {
            sessionStorage.setItem('user', JSON.stringify(user))
        } else {
            sessionStorage.removeItem('user')
        }

        if (token) {
            sessionStorage.setItem('token', token)
        } else {
            sessionStorage.removeItem('token')
        }
    }, [user, token])

    // Login user API call
    const login = async () => {
        const headers = { headers: { 'Content-Type': 'application/json' } }
        const data = { username: user.username, password: user.password }

        try {
            const response = await axios.post(url + '/user/login', data, headers)
            const { id, username: uname, token } = response.data         // Save id and username to userData
            setUser({ id, username: uname })                            // Save id and username to user
            setToken(token)                                            // Save token to token

        } catch (error) {
            setUser({ username: '', password: '' })                    // Set user and password fields empty
            setToken(null)                                            // Set token to null
            console.log('Login error: ', error)
            throw error
        }
    }

    // Register user API call
    const register = async () => {
        const headers = { headers: { 'Content-Type': 'application/json' } }
        const data = { username: user.username, password: user.password }

        try {
            await axios.post(url + '/user/register', data, headers)
            setUser({ username: '', id: null })                       // Empty user and id fields
        } catch (error) {
            throw error
        }
    }

    // Logout user
    const logout = () => {
        setUser({ id: null, username: '' }) // Set user and password fields empty
        setToken(null)                      // Set token to null
        sessionStorage.removeItem('user')   // Remove user from session storage
        sessionStorage.removeItem('token')  // Remove token from session storage
    }

    return (
        <UserContext.Provider value={{ user, setUser, register, login, logout, token }} >
            {children}
        </UserContext.Provider>
    )
}