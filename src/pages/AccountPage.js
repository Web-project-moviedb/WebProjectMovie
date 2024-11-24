import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import { UseUser } from '../context/UseUser.js'
import ReviewsByUser from '../components/reviews/ReviewsByUser.js'

import axios from "axios"

const url = process.env.REACT_APP_API_URL


function ProfilePage() {
    const { user } = UseUser()
    const params = useParams()


    const checkUserIdforDelete = () => {
        if (user.id == params.id) {
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
            console.log(response)
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(url + "/Reviews/" + id)
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
            console.log("no implimentation yet")
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }

    function checkFavoriteButton(id_for_Button) {
        if (user.id == params.id) {
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
        if (user.id == params.id) {
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


    function checkReviewButton(id_for_Button) {
        if (user.id == params.id) {
            return (
                <button id={id_for_Button} onClick={() => deleteReview(id_for_Button)}>Delete</button>
            )
        }
        else {
            return (
                <></>
            )
        }
    }
    function ProfileReviewList({ reviews }) {
        return (
            <div>
                <h3> These are my reviews</h3>
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h4>{review.review_title}</h4>
                            <p>{review.review_body}</p>
                            {checkReviewButton(review.id)}
                        </li>

                    ))
                    }


                </ul>
            </div >
        )
    }

    function ProfileFavoriteList({ favorites }) {
        return (
            <div>
                <h3> These are my favorites</h3>
                <ul>
                    {favorites.map((favorite) => (
                        <li key={favorite.id}>
                            <h4>{favorite.movie_name}</h4>
                            {checkFavoriteButton(favorite.id)}
                        </li>

                    ))
                    }


                </ul>
            </div >
        )
    }

    function ProfileGroupList({ }) {
        return (
            <div>
                <h3>These are my groups</h3>
                <ul>
                    {groups.map((group) => (
                        <li key={group.id}>
                            <h4>{group.group_name}</h4>
                            {checkGroupButton(group.id)}
                        </li>

                    ))
                    }


                </ul>
            </div>
        )
    }

    const fetchReviewsById = async () => {
        try {
            const response = await axios.get(url + "/reviews/user/" + params.id)
            return response.data
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    const fetchFavoritesById = async () => {
        try {
            const response = await axios.get(url + "/favorites/" + params.id)
            return response.data
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    const fetchGroupsById = async () => {
        try {
            const response = await axios.get(url + "/user/group/" + params.id)
            return response.data
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    const { id } = useParams()
    const [loading, setLoading] = useState(true)  // state to manage loading state
    const [error, setError] = useState(null)  // state to handle errors
    const [reviews, setReviews] = useState([])
    const [favorites, setFavorites] = useState([])
    const [groups, setGroups] = useState([])
    useEffect(() => {
        /*  const getReviews = async () => {
              try {
                  const data = await fetchReviewsById()  // fetch reviews
                  setReviews(data)
                  return data
  
  
              } catch (error) {
                  setError(error.message)
                  console.error('Error getting reviews:', error)
              } finally {
                  setLoading(false)
              }
          }*/
        const getFavorites = async () => {
            try {
                const data = await fetchFavoritesById()  // fetch reviews
                console.log(data)
                setFavorites(data)
                return data
            } catch (error) {
                setError(error.message)
                console.error('Error getting favorites:', error)
            } finally {
                setLoading(false)
            }
        }
        const getGroups = async () => {
            try {
                const data = await fetchGroupsById()  // fetch reviews
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
    if (loading) {
        return <h3>Loading...</h3>  // message while fetching
    }

    if (error) {
        return <h3>Error: {error}</h3>
    }
    return (
        <div>
            {/*}<ProfileReviewList reviews={reviews} />{*/}
            <ReviewsByUser id={params.id} />
            <ProfileFavoriteList favorites={favorites} />
            <ProfileGroupList groups={groups} />
            {checkUserIdforDelete()}
        </div>
    )
}

export default ProfilePage