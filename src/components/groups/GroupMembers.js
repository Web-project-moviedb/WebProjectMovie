import React from "react"
import { Link } from 'react-router-dom'

export default function GroupMembers({ groupUsers, isOwner, ownerId, onRemoveUser, onAcceptUser }) {
    return (
        <>
            <ul> {groupUsers.map((user) => (
                <li key={user.account_id} >
                    {user.pending ? (
                        <Link to={`/account/${user.account_id}`}>{user.uname} (Pending) </Link>
                    ) : (
                        <Link to={`/account/${user.account_id}`}>{user.uname} </Link>
                    )}
                    {isOwner && user.account_id !== ownerId && !user.pending && <button type='button' onClick={() => onRemoveUser(user.account_id)}>Remove</button>}
                    {isOwner && user.pending &&
                        <button type='button' onClick={() => onRemoveUser(user.account_id)}>Decline</button>}
                    {isOwner && user.pending && <button type='button' onClick={() => onAcceptUser(user.account_id)}>Accept</button>}
                </li>
            ))}
            </ul>
        </>
    )
}