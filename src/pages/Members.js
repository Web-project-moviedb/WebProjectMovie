import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_API_URL

function Members() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(url + `/user/members`)
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setError("Error fetching users")
        console.error(error)
      }
    };

    fetchUsers()
  }, [])

  return (
    <div>
      <h3>All Users</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <ul key={user.id}>
              <Link to={`/account/${user.id}`}>
                {user.uname}
              </Link>
            </ul>
          ))
        )}
      </ul>
    </div>
  );
}

export default Members;
