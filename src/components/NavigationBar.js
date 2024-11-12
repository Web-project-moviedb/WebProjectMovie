import React from 'react'
import "./NavigationBar.css"

export default function NavigationBar() {
    return (
        <header>
            <nav className="navbar">
                <div>
                    <ul className="nav-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/reviews">Reviews</a>
                        </li>
                        <li>
                            <a href="/groups">Groups</a>
                        </li>
                        <li>
                            <a href="/showtimes">Showtimes</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="nav-user">
                        <li>
                            <a href="/">User</a>
                        </li>
                        <li>
                            <a href="/login">login</a>
                        </li>
                    </ul>
                </div>

            </nav>
        </header>
    )

}