import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import { UseUser } from '../context/UseUser.js'
import ReviewsByUser from '../components/reviews/ReviewsByUser.js'

import axios from "axios"

const url = process.env.REACT_APP_API_URL


function ProfilePage() {
    const { user } = UseUser()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)  // state to manage loading state
    const [error, setError] = useState(null)  // state to handle errors
    const [favorites, setFavorites] = useState([])
    const [groups, setGroups] = useState([])
    useEffect(() => {

        const fetchFavoritesById = async (id) => {
            try {
                const response = await axios.get(url + "/favorites/" + id)
                return response.data
            }
            catch (error) {
                console.error('Error', error)
                if (error.status === 404) {
                }
                //throw error
            }
        }
        const fetchGroupsById = async (id) => {
            try {
                const response = await axios.get(url + "/user/group/" + id)
                return response.data
            }
            catch (error) {
                console.error('Error', error)
                throw error
            }
        }
        const getFavorites = async () => {
            try {
                const data = await fetchFavoritesById(id)  // fetch reviews
                if (data) {
                    setFavorites(data)
                    console.log("data: " + data)
                    console.log("favorites:" + favorites)
                }
            } catch (error) {
                setError(error.message)
                console.error('Error getting favorites:', error)
            } finally {
                setLoading(false)
            }
        }
        const getGroups = async () => {
            try {
                const data = await fetchGroupsById(id)  // fetch reviews
                console.log(data)
                setGroups(data)
                return data
            } catch (error) {
                setError(error.message)
                console.error('Error getting groups:', error)
            } finally {
                setLoading(false)
            }
        }
        //getReviews()
        getFavorites()
        getGroups()
    }, [id])


    const checkUserIdforDelete = () => {
        if (parseInt(user.id) === parseInt(id)) {
            return (
                <Link to="/delete">delete my profile</Link>
            )
        }
        else {
            return (
                <></>
            )
        }

    }

    const deleteFavorite = async (id) => {
        try {
            const response = await axios.delete(url + "/Favorites/" + id)
            setFavorites(favorites.filter(a => a.id !== id))
            console.log(response)
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    const deleteGroup = async (id) => {

        try {
            //const response = await axios.delete(url + "/group/" + id)
            setGroups(groups.filter(a => a.id !== id))
            console.log("no implimentation yet")
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }

    function checkFavoriteButton(id_for_Button) {
        if (parseInt(user.id) === parseInt(id)) {
            return (
                <button id={id_for_Button} onClick={() => deleteFavorite(id_for_Button)}>Delete</button>
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    function checkGroupButton(id_for_Button) {
        if (parseInt(user.id) === parseInt(id)) {
            return (
                <button id={id_for_Button} onClick={() => deleteGroup(id_for_Button)}>Delete</button>
            )
        }
        else {
            return (
                <></>
            )
        }
    }



    function ProfileFavoriteList({ favorites }) {
        console.log(favorites)
        return (
            <div>

                <h3> These are my favorites</h3>
                {favorites.length === 0 ? (
                    <p>No favorites found for this user</p>
                ) : (
                    <ul>
                        {favorites.map((favorite) => (
                            <li key={favorite.id}>
                                <h4>{favorite.movie_name}</h4>
                                {checkFavoriteButton(favorite.id)}
                            </li>

                        ))
                        }


                    </ul>
                )}
            </div >
        )
    }

    function ProfileGroupList({ groups }) {
        return (
            <div>
                <h3>These are my groups</h3>
                {groups.length === 0 ? (
                    <p>No groups for this user</p>
                ) : (
                    <ul>
                        {groups.map((group) => (
                            <li key={group.id}>
                                <h4>{group.group_name}</h4>
                                {checkGroupButton(group.id)}
                            </li>

                        ))
                        }


                    </ul>
                )}
            </div>
        )
    }


    if (loading) {
        return <h3>Loading...</h3>  // message while fetching
    }

    if (error) {
        return <h3>Error: {error}</h3>
    }
    return (
        <div>
            <ReviewsByUser id={id} />
            <ProfileFavoriteList favorites={favorites} />
            <ProfileGroupList groups={groups} />
            {checkUserIdforDelete()}
        </div>
    )
}

export default ProfilePage