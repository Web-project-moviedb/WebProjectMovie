import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../../api/tmdbFetches';

function GenreSelect({ selectedGenre, onGenreChange, onSubmit }) {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres();
                setGenres(data.genres || []);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setError('Failed to load genres.');
            }
        };
        loadGenres();
    }, []);

    return (
        <form onSubmit={onSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>
                Select genre:
                <select
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Search</button>
        </form>
    );
}

export default GenreSelect;