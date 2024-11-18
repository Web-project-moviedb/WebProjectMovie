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

    // potential features to add:
    // - add button+logic to load more pages of search results, currently searching and displaying only page 1 (top 20 results)

    return (
        <div>
            <h3>Top 20 Search Results</h3>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h4>
                            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                        </h4>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            style={{ maxWidth: '200px' }} /* NOTE remove styling from here in final version, this is just for dev convenience */
                        /> 
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
