import React from "react"
import { UseUser } from "../../context/UseUser.js"
import { SectionHeader } from "../header/Header.js"


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
        <div className="create-group-container">
            <SectionHeader text={"Create Group"} />
            <form className="create-group-form" onSubmit={handleCreateGroup}>
                <label>
                    Group Name:
                </label>
                <input type='text' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <label>
                    Description:
                </label>
                <textarea id="group-description-input-textarea" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
                <button type='submit'>Create Group</button>
            </form>
        </div>
    )
}