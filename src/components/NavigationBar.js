import React from 'react'
import { useState, useEffect } from 'react';
import { UseUser } from '../context/UseUser'
// using NavLink the browser checks if the current URL matches the Link and you can add CSS to the specific Link th is way
// Outlet is used as a placeholder for the "children" elemenent. in this case the children element the specific Page
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import "./NavigationBar.css"


const NavigationBar = () => {
    const { user, logout, token } = UseUser()
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()
    const accountUrl = "/account/" + user.id
    useEffect(() => {
        if (token) {
            setLogged(true)
        }
    }, [token])
    function logoutFunction() {
        console.log("logout function")
        setLogged(false)
        logout()
        navigate('/')
    }
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="nav-links">
                        <NavLink to="/" activeclassname="current">Home</NavLink>
                        <NavLink to="/reviews" activeclassname="current">Reviews</NavLink>
                        <NavLink to="/groups" activeclassname="current">Groups</NavLink>
                        <NavLink to="/showtimes" activeclassname="current">Showtimes</NavLink>
                    </div>
                    <div className="nav-user">
                        {logged ? <NavLink to={accountUrl} activeclassname="current">Account</NavLink> : <></>}
                        {logged ? <button onClick={logoutFunction}>Logout</button> : <NavLink to="/signin" activeclassname="current" > login</NavLink >}
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default NavigationBar;