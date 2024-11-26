import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UseUser } from '../context/UseUser.js'
import { fetchMovieById } from '../api/fetchTMDB.js'
import GroupMembers from '../components/groups/GroupMembers.js'
import GroupMovies from '../components/groups/GroupMovies.js'
import { MainHeader, SectionHeader } from '../components/Header.js'
import GroupDescription from '../components/groups/GroupDescription.js'
import { fetchGroupMembers, fetchAllGroupsByUser, removeUserFromGroup, deleteGroup, fetchGroupById, deletePinnedMovie } from '../utils/groupFunctions.js'


export default function Group() {
    const { user } = UseUser()
    const { id } = useParams() // group_id from URL
    const [isOwner, setIsOwner] = useState(false)
    const [group, setGroup] = useState(' ')
    const [groupUsers, setGroupUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const url = process.env.REACT_APP_API_URL

    useEffect(() => {
        // Check if group owner
        const checkOwnership = async () => {
            if (user.id) {
                try {
                    const groupOwner = await fetchGroupById(id)
                    if (groupOwner.owner_id === user.id) {
                        console.log('User is owner', groupOwner.owner_id)
                        setIsOwner(true)
                    }
                } catch (error) {
                    console.log(error)
                    setError('Failed to check group ownership')
                }
            }
        }
        checkOwnership()
    }, [id, user.id])

    useEffect(() => {
        getGroupData()
        getGroupMembers()
        getGroupMovies()
    }, [])

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
        console.log("Update group members")
        try {
            const response = await fetchGroupMembers(id)
            setGroupUsers(response)
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
                    const movieData = await fetchMovieById(movie.movie_id)  // HOX!!!!!!! Should use utils function to fetch movie data?????
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

    // Delete group
    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(id)
            navigate('/groups')
            console.log('Group deleted')
        } catch (error) {
            console.log(error)
            setError('Failed to delete group')
        }
    }

    // Handle remove user from group
    const handleRemoveUser = async (userId) => {
        try {
            const response = await fetchAllGroupsByUser(userId) // Returns all groups for user
            const group = response.data.find(group => String(group.user_group_id) === String(id)) // This group
            await removeUserFromGroup(group.id) // Remove user from group by account_user_group table id (relation table)
            getGroupMembers()
        } catch (error) {
            console.log(error)
            setError('Failed to remove user from group')
        }
    }

    // Handle remove movie from group
    const handleRemoveMovie = async (movieId) => {
        await deletePinnedMovie(movieId, id)
        getGroupMovies()
    }


    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div>
            <MainHeader text={group.group_name} />
            <SectionHeader text={'Description'} />
            <GroupDescription description={group.description} />
            <SectionHeader text={'Members'} />
            <GroupMembers groupUsers={groupUsers} isOwner={isOwner} onRemoveUser={handleRemoveUser} />
            <SectionHeader text={'Movies'} />
            <GroupMovies movies={movies} onRemoveMovie={handleRemoveMovie} />
            <SectionHeader text={'Pinned Show Times'} />
            {isOwner && <button type='button' onClick={handleDeleteGroup}>Delete Group</button>}
        </div >
    )
}