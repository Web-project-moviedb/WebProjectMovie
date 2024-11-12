import React from 'react'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})

export default function login() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Create handle for register and login logic here
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type='username' />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}