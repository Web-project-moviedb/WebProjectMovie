import React, { useEffect, useState } from "react"
import AllGroups from '../components/groups/AllGroups.js'
import { MainHeader } from '../components/Header.js'
import { fetchAllGroups } from "../utils/groupFunctions.js"

/* All users can view groups page
Groups page contains all the created groups
Only registered and logged in users can enter to group page
Registered users can send join request to group
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

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <MainHeader text={'Groups'} />
            <AllGroups groups={groups} />
        </div>
    )
}