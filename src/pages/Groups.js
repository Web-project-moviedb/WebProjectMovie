import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <h3>Page for all the groups</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul> {groups.map((group) => (
                <li key={group.id} >
                    <Link to={`/group/${group.id}`}> {group.group_name} </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}