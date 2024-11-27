import React from "react"
import { Link } from 'react-router-dom'

export default function GroupMovies({ movies, onRemoveMovie }) {
    if (movies.length === 0) return <p>No pinned movies...</p>
    return (
        <>
            <ul> {movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                    <button type='button' onClick={() => onRemoveMovie(movie.id)}>Remove</button>
                </li>
            ))}
            </ul>
        </>
    )
}