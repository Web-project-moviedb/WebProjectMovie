import React, { useState, useEffect } from 'react'
import { json, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { fetchMovieById } from '../api/fetchTMDB.js'

const url = process.env.REACT_APP_API_URL

export default function Group() {
    const { id } = useParams() // id from URL
    const [group, setGroup] = useState(' ')
    const [groupUsers, setGroupUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    // Get group details
    const getGroupData = async () => {
        try {
            const response = await axios(url + '/group/' + id)
            setGroup(response.data[0])
        } catch (error) {
            console.log(error)
            setError('Failed to load group data')
        }
    }

    // Get all users in group
    const getGroupMembers = async () => {
        try {
            const response = await axios(url + '/groups/' + id)
            setGroupUsers(response.data)
        } catch (error) {
            console.log(error)
            setError('Failed to load group members')
        }
    }

    // Get all movie id's in group and fetch movie details
    const getGroupMovies = async () => {
        try {
            const response = await axios(url + '/pinned/movie/' + id) // Returns id, group_id, movie_id
            const movieDetails = await Promise.all(
                response.data.map(async (movie) => {
                    const movieData = await fetchMovieById(movie.movie_id)
                    const { id, title } = movieData
                    return { id, title }
                })
            )
            setMovies(movieDetails)
        } catch (error) {
            console.log(error)
            setError('Failed to load movies')
        }
    }

    useEffect(() => {
        getGroupData()
        getGroupMembers()
        getGroupMovies()
    }, [])

    return (
        <div>
            <h2>Group: {group.group_name}</h2>
            <p>{group.description}</p>
            {error && <p>{error}</p>}
            <h3>Members:</h3>
            <ul> {groupUsers.map((user) => (
                <li key={user.account_id} >
                    {user.pending ? (
                        <span>{user.uname} (Pending)</span>
                    ) : (

                        <Link to={`/useraccountpage/${user.account_id}`}>{user.uname}</Link>
                    )}
                </li>
            ))}
            </ul>
            <h3>Group Movies</h3>
            <ul> {movies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}> {movie.title}</Link>
                </li>
            ))}
            </ul>
        </div >
    )
}