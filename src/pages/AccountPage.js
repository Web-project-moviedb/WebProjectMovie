import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { UseUser } from '../context/UseUser.js'
import ReviewsByUser from '../components/reviews/ReviewsByUser.js'
import { MainHeader, SectionHeader } from "../components/header/Header.js"
import ProfileFavoriteList from "../components/account/AccountFavorites.js"
import ProfileGroupList from "../components/account/AccountGroups.js"

function ProfilePage() {
    const { user, token } = UseUser()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (!token) {
            navigate('/error')
        }
    }, [token, navigate])


    const checkUserIdforDelete = () => {
        if (parseInt(user.id) === parseInt(id)) {
            return (
                <Link to="/delete">Delete account</Link>
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
            <MainHeader text='Profile' /> {/* Add profilename to present this as eg "Profilename Profile" */}
            <SectionHeader text='Reviews' />
            <ReviewsByUser id={id} />
            <SectionHeader text='Favorites' />
            <ProfileFavoriteList id={id} />
            <Link to={'/favorites/' + id}>Link to my favorites page</Link>
            <SectionHeader text='Groups' />
            <ProfileGroupList id={id} />
            {checkUserIdforDelete()}
        </div >
    )
}

export default ProfilePage