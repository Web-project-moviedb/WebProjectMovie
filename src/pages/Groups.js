import './Groups.css'
import React, { useEffect, useState } from "react"
import AllGroups from '../components/groups/AllGroups.js'
import { MainHeader, SectionHeader } from '../components/header/Header.js'
import { createGroup, fetchAllGroups } from "../api/groupApi.js"
import CreateGroupForm from "../components/groups/CreateGroupForm.js"
import './Groups.css'

/* All users can view groups page
Groups page contains all the created groups
Only registered and logged in users can enter to group page
Registered users can send join, cancel or leave to group
*/

export default function Groups() {
    const [groups, setGroups] = useState([])
    const [error, setError] = useState(null)

    // Get all groups
    const getGroups = async () => {
        try {
            const response = await fetchAllGroups()
            setGroups(response.data)
        } catch (error) {
            console.log(error)
            setError('Failed to fetch the groups')
        }
    }
    
    useEffect(() => {
        getGroups()
    }, [setGroups])

    // Create group
    const handleCreateGroup = async (groupName, groupDescription, userId) => {
        await createGroup(groupName, userId, groupDescription)
        getGroups() // Refresh the groups
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="groups-container">
            <MainHeader text={'Groups'} />
            <AllGroups groups={groups} />
            <SectionHeader text={'Create New Group'} />
            <CreateGroupForm onCreateGroup={handleCreateGroup} />
        </div>
    )
}