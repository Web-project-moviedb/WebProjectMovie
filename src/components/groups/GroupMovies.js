import React from "react"
import { SectionHeader } from "../header/Header"
import { Link } from 'react-router-dom'

export default function GroupMovies({ movies, onRemoveMovie }) {
    if (movies.length === 0) return <p>No pinned movies...</p>

    return (
        <div className="group-movies-container">
            <SectionHeader text='Pinned Movies' />
            <table className="group-movies-table">
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                            <td><button type='button' onClick={() => onRemoveMovie(movie.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}