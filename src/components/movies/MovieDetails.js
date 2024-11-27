import React from 'react'
import languageMap from '../../utils/languageMap'
import countryMap from '../../utils/countryMap'
import { Link } from 'react-router-dom'
// this component displays details of a single movie
// if some element is missing from the json object (eg tagline), it will not be displayed

function MovieDetails({ movie }) {

    const originalLanguageName = languageMap[movie.original_language] || movie.original_language;
    const originCountryNames = movie.origin_country.map(countryCode => countryMap[countryCode] || countryCode)

    return (
        <div>
            <h1>{movie.title}</h1>
            <p><i>{movie.tagline}</i></p>
            <p>{movie.overview}</p>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p>
                Release date: {movie.release_date}<br />
                Runtime: {movie.runtime} minutes<br /><br />

                Origin country: {originCountryNames.join(', ')}<br />
                Primary language: {originalLanguageName}<br />
                {movie.original_language !== "en" && (
                    <>
                        Original Title: <i>{movie.original_title}</i><br />
                    </>
                )}

                {movie.belongs_to_collection && (
                <>
                    <br />Belongs to: <Link to={`/collection/${movie.belongs_to_collection.id}`}>{movie.belongs_to_collection.name}</Link><br />
                </>
            )} </p>

            <p>Genres:</p>
            <ul>
                {movie.genres.map((genre) => (  // map over the genres array to display each genre
                    <li key={genre.id}>{genre.name}</li>    // use the genre id as the key, but display the genre name
                ))}
            </ul>
        </div>
    );
}

export default MovieDetails;