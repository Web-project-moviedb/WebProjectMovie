import React from 'react';

function MovieDetails({ movie }) {
    return (
        <div>
            <h3>{movie.title}</h3>
                <p><i>{movie.tagline}</i></p>
                <p>{movie.overview}</p>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <p>Release date: {movie.release_date}
                <br />Runtime: {movie.runtime} minutes</p>
                {movie.original_language !== "en" && (
                    <p>Original Language: {movie.original_language}
                    <br />Original Title: {movie.original_title}</p>
                )}
                <p>Genres:</p>
                <ul>
                    {movie.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
                <p>Add button to add to favorites here!</p>
                <p>Add drop-down menu and button to pin to group here!</p>
        </div>
    );
}

export default MovieDetails;