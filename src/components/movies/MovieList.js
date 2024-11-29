import React from 'react'
import { Link } from 'react-router-dom'

function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p></p>
    }

    // this is the list of movies that will be displayed
    // the map function will iterate over each movie in the list and create a list item
    // the key prop is used to uniquely identify each list item
    // the Link component is used to create a link to the movie details page

    return (
        <div>
            <center>
                <h2>Top 20 Search Results</h2>
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <h3>
                                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                            </h3>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className="movie-poster"
                            /> 
                            <p>Release Date: {movie.release_date}</p>
                            {movie.title !== movie.original_title && (
                                <p>Original Title: {movie.original_title}</p>
                            )}
                        </div>
                    ))}
                </div>
            </center>
        </div>
    )
}

export default MovieList
