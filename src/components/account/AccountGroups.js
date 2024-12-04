import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { UseUser } from '../../context/UseUser.js'
import axios from "axios"

const url = process.env.REACT_APP_API_URL



function ProfileGroupList({ id }) {
    const { user, token } = UseUser()
    const [loading, setLoading] = useState(true)  // state to manage loading state
    const [error, setError] = useState(null)  // state to handle errors
    const [groups, setGroups] = useState([])

    const navigate = useNavigate()


    useEffect(() => {

        if (!token) {
            navigate('/error')
        }

        const fetchGroupsById = async (id) => {
            try {
                const response = await axios.get(url + "/user/group/" + id)
                return response.data
            }
            catch (error) {
                console.error('Error', error)
                throw error
            }
        }

        const getGroups = async () => {
            try {
                const data = await fetchGroupsById(id)  // fetch reviews
                setGroups(data)
                return data
            } catch (error) {
                setError(error.message)
                console.error('Error getting groups:', error)
            } finally {
                setLoading(false)
            }
        }
        getGroups()
    }, [id, token, user.id, navigate])

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }


    const deleteGroup = async (id) => {

        try {
            await axios.delete(url + "/user/invite/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setGroups(groups.filter(a => a.id !== id))
        }
        catch (error) {
            console.error('Error', error)
            throw error
        }
    }


    function checkGroupButton(id_for_Button, owner_id, pending) {

        if (parseInt(user.id) === parseInt(id)) {

            // Check if currently logger in user is owner of group
            if (parseInt(user.id) === parseInt(owner_id)) {
                return (
                    <p> Owner</p>
                )
            }

            // check if invite is currently pending
            if (pending === true) {
                return (
                    <button id={id_for_Button} onClick={() => deleteGroup(id_for_Button)}>Cancel Request</button>
                )
            }
            return (
                <button id={id_for_Button} onClick={() => deleteGroup(id_for_Button)}>Leave Group</button>
            )
        }
        else {
            return (
                <></>
            )
        }
    }
    return (
        <div>
            {groups.length === 0 ? (
                <p>No groups for this user</p>
            ) : (
                <ul>
                    {groups.map((group) => (
                        <li key={group.id}>
                            <h4>{group.group_name}</h4>
                            {checkGroupButton(group.id, group.owner_id, group.pending)}
                        </li>
                    ))
                    }
                </ul>
            )}
        </div>
    )
}


export default ProfileGroupList