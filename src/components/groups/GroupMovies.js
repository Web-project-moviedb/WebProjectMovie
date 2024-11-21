import React from "react"
import { Link } from 'react-router-dom'

export default function GroupMovies({ movies }) {
    return (
        <>
            <ul> {movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                </li>
            ))}
            </ul>
        </>
    )
}