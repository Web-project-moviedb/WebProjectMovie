import React from "react"
import { UseUser } from "../../context/UseUser.js"

export default function CreateGroupForm({ onCreateGroup }) {
    const { user } = UseUser()
    const [groupName, setGroupName] = React.useState('')
    const [groupDescription, setGroupDescription] = React.useState('')
    const [error, setError] = React.useState(null)

    if (!user.id) {
        return <div><i>You must be logged in to create a group.</i></div>
    }

    const handleCreateGroup = (e) => {
        e.preventDefault()
        if (groupName === '' || groupDescription === '') {
            setError('Group name and description are required.')
            return
        }
        onCreateGroup(groupName, groupDescription, user.id)
        setGroupName('')
        setGroupDescription('')
        setError(null)
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="create-group-form" onSubmit={handleCreateGroup}>
                <div className="group-fields">
                    <div className="group-name-field">
                        <label htmlFor="group_name">Group Name:</label>
                        <textarea
                            id="group_name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="group-description-field">
                        <label htmlFor="group_description">Group Description:</label>
                        <textarea
                            id="group_description"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit">Create Group</button>
            </form>
        </div>
    )
}