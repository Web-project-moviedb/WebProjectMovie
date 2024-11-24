import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/favorites")
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
      <h3>All Users Favorites</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <ul key={user.id}>
              {user.uname}{" "}
              {/* Button to one user favorites */}
              <Link to={`/favorites/${user.id}`}>
                <button>Show Favorites</button>
              </Link>
            </ul>
          ))
        )}
      </ul>
    </div>
  );
}

export default Favorites;
