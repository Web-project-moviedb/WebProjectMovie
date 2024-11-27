import React, { useEffect, useState } from "react";

import { UseUser } from "../../context/UseUser";


const AddToFavoritesButton = ({ movie }) => {
    const { user, token } = UseUser()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [isFavorites, setIsFavorites] = useState(false)

    useEffect(() => {
        const checkIfFavorite = async () => {
            
                try{
                    const response = await fetch(`http://localhost:3001/favorites/${user.id}`)
                    if (!response.ok) {
                        throw new Error("Failed to fetch favorites")
                    }
                    const data = await response.json()

                    const movieExists = data.some(favorite => favorite.movie_id === movie.id)
                    setIsFavorites(movieExists)

                } catch (error){
                    console.error('Error checking if favorite: ',error)
                }
            
        } 

        checkIfFavorite()
    }, [user, token, movie.id])


    const handleAddFavorite = async () => {
        if (!user) {
            console.error('User ID is missing')
            setError('User ID is missing')
            return
        }
    
        if (!token) {
            console.error('Token is missing');
            setError('Login to add to favorites')
            return
        }
        if (isFavorites) {
            console.error('Movie is already in favorites')
            setError('Movie is already in favorites')
            return
        }
    
        try {
            const response = await fetch("http://localhost:3001/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: user.id,
                    movie_id: movie.id,
                    movie_name: movie.title,
                }),
            })
            if (!response.ok) {
                throw new Error("Failed to add favorite")
            }

            setSuccess(true)
            setError(null)
            setIsFavorites(true)
        } catch (error) {
            setError("Could not add favorite.")
            setSuccess(false)
        }
    }
        if(token && user){
        return (
            <div>
                <button onClick={handleAddFavorite} 
                disabled={isFavorites}> {!isFavorites ? "Add To Favorites" : "Already in favorites"} </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Movie added to favorites!</p>}
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={handleAddFavorite} disabled> Login to add in favorites </button>
            </div>
        )
    }
   
}


export default AddToFavoritesButton