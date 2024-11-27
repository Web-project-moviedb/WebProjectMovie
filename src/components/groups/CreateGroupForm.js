import React from "react"
import { UseUser } from "../../context/UseUser.js"


export default function CreateGroupForm({ onCreateGroup }) {
    const { user } = UseUser()
    const [groupName, setGroupName] = React.useState('')
    const [groupDescription, setGroupDescription] = React.useState('')

    if (!user.id) {
        return <div>You must be logged in to create a group</div>
    }
    const handleCreateGroup = (e) => {
        e.preventDefault()
        if (groupName === '' || groupDescription === '') {
            alert('Group name and description is required')
            return
        }
        onCreateGroup(groupName, groupDescription, user.id)
        setGroupName('')
        setGroupDescription('')
    }

    return (
        <form onSubmit={handleCreateGroup}>
            <label>
                Group Name:
                <input type='text' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
            </label>
            <button type='submit'>Create Group</button>
        </form>
    )
}