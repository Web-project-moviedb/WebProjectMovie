import React from 'react'

function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p></p>
    }

    return (
        <div>
            <h3>Top 20 Search Results</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h4>{movie.title}</h4>
                        <p>{movie.overview}</p>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            style={{ maxWidth: '200px' }}
                        /> 
                        {/* <p>{movie.id}</p> */}
                        <p>Release Date: {movie.release_date}</p>
                        {movie.title !== movie.original_title && (
                            <p>Original Title: {movie.original_title}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieList