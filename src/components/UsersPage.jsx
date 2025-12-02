// src/components/UsersPage.jsx
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Users`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Loaded users:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function editRow(user) {
    alert("Edit clicked for user: " + user.id);
  }

  function deleteUser(id) {
    alert("Delete clicked for user ID: " + id);
  }

  return (
    <div className="container mt-3">
      <h2>User List</h2>

      <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
    </div>
  );
}
