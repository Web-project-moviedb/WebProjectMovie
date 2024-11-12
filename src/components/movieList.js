import React from 'react'

function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p>No movies to display.</p>
    }

    return (
        <div>
            <h3>Movies</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h4>{movie.title}</h4>
                        <p>Release Date: {movie.release_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieList