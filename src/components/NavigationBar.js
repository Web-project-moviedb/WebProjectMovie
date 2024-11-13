import React from 'react'

// using react Link you can navigate to different pages without reloading the page
// using NavLink the browser checks if the current URL matches the Link and you can add CSS to the specific Link th is way
// Outlet is used as a placeholder for the "children" elemenent. in this case the children element the specific Page

import { Link, NavLink, Outlet } from 'react-router-dom';
import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="nav-links">
                        <NavLink to="/" activeClassName="current">Home</NavLink>
                        <NavLink to="/reviews" activeClassName="current">Reviews</NavLink>
                        <NavLink to="/groups" activeClassName="current">Groups</NavLink>
                        <NavLink to="/showtimes" activeClassName="current">Showtimes</NavLink>
                    </div>
                    <div className="nav-user">
                        <NavLink to="/" activeClassName="current">User</NavLink>
                        <NavLink to="/login" activeClassName="current">login</NavLink>
                    </div>

                </nav>
            </header>
            <Outlet />
        </>

    )

}

export default NavigationBar;