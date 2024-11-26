import { UseUser } from '../context/UseUser.js'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function DeleteProfile() {

    const default_url = process.env.REACT_APP_API_URL
    const { logout, user } = UseUser()
    const navigate = useNavigate()
    const [deletePassword, setDeletePassword] = useState('')


    const deleteFunction = async () => {
        try {
            const response = await axios({
                method: 'delete',
                url: default_url + '/user/delete',
                data: {
                    "id": user.id,
                    "password": deletePassword,
                    "username": user.username
                }

            })
            console.log(response)
            await logout()
            navigate('/')
            alert('account deleted')
            //return response
        }
        catch (error) {
            console.log('Error', error)
            alert("wrong password")
            setDeletePassword('')
            //throw error
        }

    }
    const returnFunction = async () => {

        navigate('/account/' + user.id) // Navigates to previous page
    }


    return (
        <div>
            <h3>Are you sure you want to delete?</h3>
            <div>
                <label>Type your password</label>
                <input type='password' value={deletePassword || ''} onChange={e => setDeletePassword(e.target.value)} />
            </div>
            <button onClick={() => deleteFunction()}>Yes</button>
            <button onClick={() => returnFunction()}>return</button>
        </div>

    )
}


export default DeleteProfile