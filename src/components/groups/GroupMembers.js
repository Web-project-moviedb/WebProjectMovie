import React from "react"
import { Link } from 'react-router-dom'

export default function GroupMembers({ groupUsers }) {
    return (
        <>
            <ul> {groupUsers.map((user) => (
                <li key={user.account_id} >
                    {user.pending ? (
                        <span>{user.uname} (Pending)</span>
                    ) : (
                        <Link to={`/profile/${user.account_id}`}>{user.uname}</Link>
                    )}
                </li>
            ))}
            </ul>
        </>
    )
}