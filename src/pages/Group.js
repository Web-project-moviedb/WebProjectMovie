import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { fetchMovieById } from '../api/fetchTMDB.js'
import GroupMembers from '../components/groups/GroupMembers.js'
import GroupMovies from '../components/groups/GroupMovies.js'
import { MainHeader, SectionHeader } from '../components/Header.js'
import GroupDescription from '../components/groups/GroupDescription.js'


export default function Group() {
    const { id } = useParams() // id from URL
    const [group, setGroup] = useState(' ')
    const [groupUsers, setGroupUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    const url = process.env.REACT_APP_API_URL

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
    })

    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div>
            <MainHeader text={group.group_name} />
            <GroupDescription description={group.description} />
            <SectionHeader text={'Members'} />
            <GroupMembers groupUsers={groupUsers} />
            <SectionHeader text={'Movies'} />
            <GroupMovies movies={movies} />
        </div >
    )
}