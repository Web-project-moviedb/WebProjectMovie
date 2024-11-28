import React, { useEffect, useState } from 'react'
import { UseUser } from '../../context/UseUser.js'
import { fetchAllGroupsByUser, addMovieToGroup } from '../../utils/groupFunctions'
import { SectionHeader } from '../Header.js'

export default function AddMovieToGroup({ movie }) {
    const { user } = UseUser()
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('')

    useEffect(() => {
        getGroups()
    }, [])

    const getGroups = async () => {
        if (user.id) {
            try {
                const userGroups = await fetchAllGroupsByUser(user.id)
                const groups = userGroups.data.filter(group => group.pending === false) // check that user is accepted to group
                setGroups(groups)
            } catch (error) {
                console.error('Error fetching groups:', error)
            }
        }
    }

    const onGroupChange = (e) => {
        setSelectedGroup(e.target.value)
    }

    const handleAddMovie = async () => {
        if (!selectedGroup) {
            alert('Please select a group')
            return
        }
        addMovieToGroup(movie.id, selectedGroup)
    }
    if (!user.id) {
        return <p>Please log in to add a movie to a group</p>
    }
    return (
        <>
        <SectionHeader text='Add Movie to Group' />
            <label> 
                <select value={selectedGroup} onChange={(e) => onGroupChange(e)}>
                    <option value=''>-- Select Group --</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.user_group_id}>{group.group_name}</option>
                    ))}
                </select>
            </label>
            <button type='button' onClick={handleAddMovie}>Add Movie</button>
        </>
    )
}