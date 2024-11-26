import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { fetchAllGroupsByUser, joinGroup, removeUserFromGroup } from "../../utils/groupFunctions.js"
import { UseUser } from "../../context/UseUser.js"

// Return all groups in a list
export default function AllGroups({ groups }) {
    const { user } = UseUser()
    const [userGroups, setUserGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchGroupMemberships()
    }, [user.id])

    // Get all groups that user belongs to
    const fetchGroupMemberships = async () => {
        try {
            if (!user.id) return
            const response = await fetchAllGroupsByUser(user.id) // Get all groups for user 
            const filteredGroups = response.data.map(group => ({
                invite_id: group.id,
                account_id: group.account_id,
                group_id: group.user_group_id,
                pending: group.pending
            }))
            setUserGroups(filteredGroups)
        } catch (error) {
            setError('Failed to fetch group memberships')
        } finally {
            setLoading(false)
        }
    }

    //Add button by state of user in group
    const selectButton = (group_id) => {
        if (!user.id) return
        const group = userGroups.find(group => group.group_id === group_id)
        if (group) {
            if (group.pending === true) {
                return <button type="button" onClick={() => handleLeaveButton(group.invite_id)}>Cancel Request</button> // Request sent
            }
            return <button type="button" onClick={() => handleLeaveButton(group.invite_id)}>Leave Group</button> // User belongs to group
        }
        return <button type="button" onClick={() => handleJoinButton(group_id)}>Join Group</button> // User doesnt belong to group
    }
    

    // Add user to group
    const handleJoinButton = async (group_id) => {
        console.log("join group: ", group_id)
        try {
            await joinGroup(user.id, group_id)
            setUserGroups([...userGroups, { account_id: user.id, group_id: group_id, pending: true }])
            fetchGroupMemberships()
        } catch (error) {
            setError('Failed to join group')
        }
    }

    // Remove user from group
    const handleLeaveButton = async (invite_id) => {
        console.log("leave group: ", invite_id)
        try {
            await removeUserFromGroup(invite_id)
            setUserGroups((prevGroups) => prevGroups.filter(group => group.invite_id !== invite_id))
            fetchGroupMemberships()
        } catch (error) {
            setError('Failed to leave group')
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td><Link to={`/group/${group.id}`}> {group.group_name} </Link></td>
                            <td>{group.description}</td>
                            <td>{selectButton(group.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}