import React from "react"
import { Link } from 'react-router-dom'

export default function AllGroups({ groups, error }) {

    return (
        <>
        {error && <p>{error}</p>}
            <ul> {groups.map((group) => (
                <li key={group.id} >
                    <Link to={`/group/${group.id}`}> {group.group_name} </Link>
                </li>
            ))}
            </ul>
        </>
    )
}