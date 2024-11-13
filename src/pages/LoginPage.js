import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UseUser } from '../context/UseUser.js'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})

export default function Login({ authenticationMode }) {
    const { user, setUser, login, register } = UseUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await register()
                navigate('/login/signin')
            } else {
                await login()
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h3> {authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type='text' value={user.username || ''} onChange={e => setUser({ ...user, username: e.target.value })} />
                </div>
                <div>
                    <label>Password</label>
                    <input type='text' value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} />
                </div>
                <div>
                    <button> {authenticationMode === AuthenticationMode.Login ? 'Login' : 'Register'}</button>
                </div>
                <div>
                    <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                        {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up here' : 'Already have an account? Sign in here'}
                    </Link>
                </div>
            </form>
        </div>
    )
}