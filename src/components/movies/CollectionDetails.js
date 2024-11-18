import React from "react"
import { Link } from "react-router-dom"

function CollectionDetails({ collection }) {

    return (
        <div>
            <h1>{collection.name}</h1>
            <p>{collection.overview}</p>

            {collection.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                    alt={collection.name}
                />
            )}

            <h2>Movies in this collection:</h2>
            <ul>
            {collection.parts.map((movie) => (
          <li key={movie.id}>
            <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            )}
          </li>
        ))}
            </ul>
        </div>
    )
}

export default CollectionDetails