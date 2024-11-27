import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UseUser } from '../context/UseUser.js'
import { fetchMovieById } from '../api/fetchTMDB.js'
import { MainHeader, SectionHeader } from '../components/Header.js'
import { fetchGroupMembers, fetchAllGroupsByUser, removeUserFromGroup, deleteGroup, fetchGroupById, deletePinnedMovie, acceptInvite, fetchGroupMovies } from '../utils/groupFunctions.js'
import GroupDescription from '../components/groups/GroupDescription.js'
import GroupMembers from '../components/groups/GroupMembers.js'
import GroupMovies from '../components/groups/GroupMovies.js'

/* Group page
Only registered and logged in users can enter to group page
Group page contains group details, members and pinned movies
Group owner can delete group, remove users and movies from group
Group owner can accept or decline join invitations from users
*/


export default function Group() {
    const { user } = UseUser()
    const { id } = useParams() // group_id from URL
    const [isOwner, setIsOwner] = useState(false)
    const [group, setGroup] = useState(' ')
    const [groupUsers, setGroupUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        // Check if group owner and set status
        const checkOwnership = async () => {
            if (user.id) {
                try {
                    const groupOwner = await fetchGroupById(id)
                    if (groupOwner.owner_id === user.id) {
                        setIsOwner(true)
                    }
                } catch (error) {
                    console.log(error)
                    setError('Failed to check group ownership')
                }
            }
        }
        checkOwnership()
        getGroupData()
        getGroupMembers()
        getGroupMovies()
    }, [id, user.id])

    useEffect(() => {
        
    }, [])

    // Get group details
    const getGroupData = async () => {
        try {
            const response = await fetchGroupById(id)
            setGroup(response)
        } catch (error) {
            console.log(error)
            setError('Failed to load group data')
        }
    }

    // Delete group
    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(id)
            navigate('/groups')
        } catch (error) {
            console.log(error)
            setError('Failed to delete group')
        }
    }

    // Get all users in group
    const getGroupMembers = async () => {
        try {
            const response = await fetchGroupMembers(id)
            setGroupUsers(response)
        } catch (error) {
            console.log(error)
            setError('Failed to load group members')
        }
    }

    // Handle Accept user
    const handleAcceptUser = async (userId) => {
        try {
            const response = await fetchAllGroupsByUser(userId) // Returns all groups for user
            const group = response.data.find(group => String(group.user_group_id) === String(id)) // This group
            await acceptInvite(group.id) // Remove user from group by account_user_group table id (relation table)
            getGroupMembers()  // Refresh members
        } catch (error) {
            console.log(error)
            setError('Failed to remove user from group')
        }
    }

    // Handle remove user from group
    const handleRemoveUser = async (userId) => {
        try {
            const response = await fetchAllGroupsByUser(userId) // Returns all groups for user
            const group = response.data.find(group => String(group.user_group_id) === String(id)) // This group
            await removeUserFromGroup(group.id) // Remove user from group by account_user_group table id (relation table)
            getGroupMembers()  // Refresh members
        } catch (error) {
            console.log(error)
            setError('Failed to remove user from group')
        }
    }


    // Get all movie id's in group and fetch movie details
    const getGroupMovies = async () => {
        try {
            const response = await fetchGroupMovies(id)
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

    // Handle remove movie from group
    const handleRemoveMovie = async (movieId) => {
        await deletePinnedMovie(movieId, id)
        getGroupMovies()    // Refresh movies
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
            <GroupMembers groupUsers={groupUsers} isOwner={isOwner} ownerId={group.owner_id} onRemoveUser={handleRemoveUser} onAcceptUser={handleAcceptUser} />
            <SectionHeader text={'Movies'} />
            <GroupMovies movies={movies} onRemoveMovie={handleRemoveMovie} />
            {/* Pinned showtimes */}
            {isOwner && <button type='button' onClick={handleDeleteGroup}>Delete Group</button>}
        </div >
    )
}