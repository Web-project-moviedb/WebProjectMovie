import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FavoritesPage() {
    const { id } = useParams() // Haetaan userId URL-osoitteesta
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchFavorites = async () => {

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`http://localhost:3001/favorites/${id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch favorites")
                }
                const data = await response.json()
                setFavorites(data)
                setUserName(data[0])
            } catch (error) {
                setError("Could not load favorites")
                console.log("Could not load favorites", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [id])

    if(favorites.length > 0){
        return (
            <div>
                <h3 key={userName.id}>{userName.uname}'s Favorites</h3>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                    <ul>
                        {favorites.map((fav) => (
                            <li key={fav.id}>{fav.movie_name}</li>
                        ))}
                    </ul>
            </div>
        )
    }else{
        return(
            <div>
                <p>No favorites found for this user</p>  
            </div>
        )
    }
}
export default FavoritesPage;
