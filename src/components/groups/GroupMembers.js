import React from "react"
import { Link } from 'react-router-dom'

export default function GroupMembers({ groupUsers, isOwner, onRemoveUser }) {
    console.log("listing users")
    return (
        <>
            <ul> {groupUsers.map((user) => (
                <li key={user.account_id} >
                    {user.pending ? (
                        <span>{user.uname} (Pending)</span>
                    ) : (
                        <Link to={`/profile/${user.account_id}`}>{user.uname}</Link>
                    )}
                    {isOwner && !user.pending && <button type='button' onClick={() => onRemoveUser(user.account_id)}>Remove</button>}
                </li>
            ))}
            </ul>
        </>
    )
}