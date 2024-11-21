import React, { useEffect, useState } from "react"
import axios from 'axios'
import AllGroups from '../components/groups/AllGroups.js'
import { MainHeader } from '../components/Header.js'

const url = process.env.REACT_APP_API_URL

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
            const response = await axios(url + '/groups')
            setGroups(response.data)
        } catch (error) {
            console.log(error)
            setError('Failed to fetch the groups')
        }
    }
    
    useEffect(() => {
        getGroups()
    }, [])

    return (
        <div>
            <MainHeader text={'Groups'} />
            <AllGroups groups={groups} error={error} />
        </div>
    )
}