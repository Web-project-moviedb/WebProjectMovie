import axios from "axios"
const url = process.env.REACT_APP_API_URL

// Create group
const createGroup = async (groupName, ownerId, groupDescription) => {
    try {
        const response = await axios.post(url + '/group', {

            group_name: groupName,
            owner_id: ownerId,
            group_description: groupDescription
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error.message
    }
}

// Get all members in group
const fetchGroupMembers = async (groupId) => {
    try {
        const response = await axios(url + '/groups/' + groupId, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

// Get group by id
const fetchGroupById = async (groupId) => {
    try {
        const response = await axios(url + '/group/' + groupId)
        return response.data[0]
    } catch (error) {
        return error.message
    }
}

// Get all groups
const fetchAllGroups = async () => {
    try {
        const response = await axios(url + '/groups', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response
    } catch (error) {
        return error.message
    }
}

// Get all groups for specific user_id
const fetchAllGroupsByUser = async (userId) => {
    try {
        const response = await axios(url + '/user/group/' + userId, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.message
    }
}

const fetchGroupMovies = async (groupId) => {
    try {
        const response = await axios(url + '/pinned/movie/' + groupId)
        return response
    } catch (error) {
        return error.message
    }
}

// Join group as user
const joinGroup = async (userId, groupId) => {
    try {
        const response = await axios.post(url + '/user/invite', {
            account_id: userId,
            group_id: groupId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error.message
    }
}

// Remove user from group
const removeUserFromGroup = async (invite_id) => {
    try {
        const response = await axios.delete(url + '/user/invite/' + invite_id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

// Delete group
const deleteGroup = async (groupId) => {
    try {
        const response = await axios.delete(url + '/group/' + groupId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

// Delete movie from selected group
const deletePinnedMovie = async (movie_id, group_id) => {
    try {
        const pinnedMovies = await axios.delete(url + '/pinned/movie/' + group_id)
        const pinnedMovie = pinnedMovies.data.find(movie => movie.movie_id === movie_id)
        const response = await axios(url + '/pinned/movie/' + pinnedMovie.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

// Add movie to group
const addMovieToGroup = async (movie_id, group_id) => {
    try {
        const response = await axios.post(url + '/pinned/movie', {
            group_id: group_id,
            movie_id: movie_id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        if (response.status === 200) {
            alert('Movie added to group')
        }
    } catch (error) {
        console.log(error.response.data.error)
        alert(error.response.data.error)
    }
}

const acceptInvite = async (invite_id) => {
    try {
        const response = await axios.put(url + '/user/invite/' + invite_id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

const deletePinnedShowtime = async (showtime_id) => {
    try {
        const response = await axios.delete(url + '/pinned/showtime/' + showtime_id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export { createGroup, fetchGroupMembers, fetchGroupById, fetchAllGroups, fetchGroupMovies, fetchAllGroupsByUser, joinGroup, removeUserFromGroup, deleteGroup, addMovieToGroup, deletePinnedMovie, acceptInvite, deletePinnedShowtime }