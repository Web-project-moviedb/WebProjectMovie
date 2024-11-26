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

// Get group by id
const fetchGroupById = async (groupId) => {
    try {
        const response = await axios(url + '/group/' + groupId)
        return response.data[0]
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

const removeUserFromGroup = async (invite_id) => {
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

const deleteGroup = async (groupId) => {
    try {
        const response = await axios(url + '/group/' + groupId, {
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

const deletePinnedMovie = async (movie_id, group_id) => {
    console.log(movie_id, group_id)
    try {
        const pinnedMovies = await axios(url + '/pinned/movie/' + group_id)
        const pinnedMovie = pinnedMovies.data.find(movie => movie.movie_id === movie_id)
        const response = await axios(url + '/pinned/movie/' + pinnedMovie.id, {
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

export { fetchGroupMembers, fetchGroupById, fetchAllGroups, fetchAllGroupsByUser, joinGroup, removeUserFromGroup, deleteGroup, deletePinnedMovie }