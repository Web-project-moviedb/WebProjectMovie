import React, { useEffect, useState, useCallback } from "react"
import { Link } from 'react-router-dom'
import { fetchAllGroupsByUser, joinGroup, removeUserFromGroup } from "../../utils/groupFunctions.js"
import { UseUser } from "../../context/UseUser.js"

// Return all groups in a list
export default function AllGroups({ groups }) {
    const { user } = UseUser()
    const [userGroups, setUserGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Get all groups that user belongs to
    const fetchGroupMemberships = useCallback(async () => {
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
    }, [user.id])

    //Add button by state of user in group
    const selectButton = (group_id, owner_id) => {
        if (!user.id) return
        const group = userGroups.find(group => group.group_id === group_id)
        if (user.id === owner_id) return <span><button disabled>Owner cannot leave group</button></span>
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
        try {
            await joinGroup(user.id, group_id)
            setUserGroups([...userGroups, { account_id: user.id, group_id: group_id, pending: true }])
            fetchGroupMemberships() // Update user groups
        } catch (error) {
            setError('Failed to join group')
        }
    }

    // Remove user from group
    const handleLeaveButton = async (invite_id) => {
        try {
            await removeUserFromGroup(invite_id)
            setUserGroups((prevGroups) => prevGroups.filter(group => group.invite_id !== invite_id))
            fetchGroupMemberships() // Update user groups
        } catch (error) {
            setError('Failed to leave group')
        }
    }

    useEffect(() => {
        fetchGroupMemberships() // Get all groups for user
    }, [groups, fetchGroupMemberships])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            {!user.id && <p><i>You must be logged in to join groups.</i></p>}
            <div className="groups-grid">
                {groups.map((group) => (
                    <div key={group.id} className="group-card">
                        <h3>
                            {userGroups.some(
                                (userGroup) => userGroup.group_id === group.id && !userGroup.pending
                            ) ? (
                                <Link to={`/group/${group.id}`}>{group.group_name}</Link>
                            ) : (
                                group.group_name
                            )}
                        </h3>
                        <p>{group.description}</p>
                        <div className="group-actions">{selectButton(group.id, group.owner_id)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}