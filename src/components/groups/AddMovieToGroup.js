import React, { useEffect, useState } from 'react'
import { UseUser } from '../../context/UseUser.js'
import { fetchAllGroupsByUser, addMovieToGroup } from '../../api/groupApi.js'
import { SectionHeader } from '../header/Header.js'

export default function AddMovieToGroup({ movie }) {
    const { user } = UseUser()
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('')

    useEffect(() => {
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
        getGroups()
    }, [user.id])

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
        return (
            <div className="add-movie-to-group-container">
                <SectionHeader text='Pin Movie to Group' />
                <p><i>Log in to pin this movie to a group</i></p>
            </div>
    )
    }
    return (
        <>
            <div className="add-movie-to-group-container">
                <SectionHeader text='Pin Movie to Group' />
                <label> 
                    <select value={selectedGroup} onChange={(e) => onGroupChange(e)}>
                        <option value=''>-- Select Group --</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.user_group_id}>{group.group_name}</option>
                        ))}
                    </select>
                </label>
                <button type='button' onClick={handleAddMovie}>Add Movie</button>
            </div>
        </>
    )
}