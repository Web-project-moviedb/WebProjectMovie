import axios from "axios"

const url = process.env.REACT_APP_API_URL

// Get all members in group
const fetchGroupMembers = async (groupId) => {
    try {
        const response = await axios(url + '/groups/' + groupId)
        return response.data
    } catch (error) {
        return error
    }
}

// Get all groups
const fetchAllGroups = async () => {
    try {
        const response = await axios(url + '/groups')
        return response
    } catch (error) {
        return error
    }
}

// Get all groups for specific user_id
const fetchAllGroupsByUser = async (userId) => {
    try {
        const response = await axios(url + '/user/group/' + userId)
        return response
    } catch (error) {
        return error
    }
}

const joinGroup = async (userId, groupId) => {
    try {
        const response = await axios.post(url + '/user/invite', {
            method: 'POST',
            account_id: userId,
            group_id: groupId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

const leaveGroup = async (invite_id) => {
    try {
        const response = await axios(url + '/user/invite' + invite_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export { fetchGroupMembers, fetchAllGroups, fetchAllGroupsByUser, joinGroup, leaveGroup }