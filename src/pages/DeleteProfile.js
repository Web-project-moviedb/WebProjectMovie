import { UseUser } from '../context/UseUser.js'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function DeleteProfile() {

    const default_url = process.env.REACT_APP_API_URL
    const { logout, user, token, readAuthorizationHeader } = UseUser()
    const [deletePassword, setDeletePassword] = useState('')
    const navigate = useNavigate()


    const deleteFunction = async () => {
        try {
            await axios({
                method: 'delete',
                url: default_url + '/user/delete',
                data: {
                    "id": user.id,
                    "password": deletePassword,
                    "username": user.username
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            await logout()
            navigate('/')
            alert('Account deleted successfully')
        }
        catch (error) {
            setDeletePassword('')
            console.log('Error', error)
            alert("Incorrect password")
            setDeletePassword('')
        }

    }
    const returnFunction = async () => {

        navigate('/account/' + user.id) // Navigates to previous page
    }


    return (
        <div>
            <h3>Are you sure you want to delete your account? All data will be permanently lost</h3>
            <div>
                <label>Type your password</label>
                <input type='password' value={deletePassword || ''} onChange={e => setDeletePassword(e.target.value)} />
            </div>
            <button onClick={() => deleteFunction()}>Delete</button>
            <button onClick={() => returnFunction()}>Cancel</button>
        </div>

    )
}


export default DeleteProfile