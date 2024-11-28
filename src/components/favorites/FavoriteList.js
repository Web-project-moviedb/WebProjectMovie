import React from "react"
import { Link } from "react-router-dom"

const FavoriteList = ({ userName, favorites, loading, error }) => {

    if (loading) {
        return <p>Loading...</p>
    }   
    if( error ){
        return <p style={{ color: "red" }}>{error}</p>
    }
    if (favorites.length === 0) {
        return <p>No favorites found for this user</p>
    }
    
return (
    <div> 
        <h3> {userName}'s Favorites</h3>
        <ul>
            {favorites.map((fav) => (
            <li key={fav.id}>
                <Link to={`/movie/${fav.movie_id}`}> {fav.movie_name}</Link> 
            </li>
            ))}
        </ul>
    </div>
)

}
export default FavoriteList
