// src/App.js
import React, { useState, useEffect, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./table/UserTable";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:64292";


function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: null,
    Firstname: "",
    Lastname: "",
    email: "",
    contact: "",
    Place: "",
    Department: "",
    status: "Active",
  };

  const [currentUser, setCurrentUser] = useState(initialFormState);



  // ADD USER WITH SUCCESS NOTIFICATION
  const handleAddUser = async (userData) => {
    await addUser(userData);

    setSuccessMessage("Record added successfully!");  // 🔥 show success

    setTimeout(() => setSuccessMessage(""), 3000);    // 🔥 auto-hide after 3 sec

    loadUsers(); // refresh table
  };


  // ---------------------------
  // LOAD USERS FROM API
  // ---------------------------
  async function loadUsers() {
    try {
   const res = await fetch(`${API_BASE_URL}/api/Users`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]); // fallback
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // ---------------------------
  // ADD USER
  // ---------------------------
  async function addUser(user) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/Users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error(`Add failed: ${res.status}`);
      await loadUsers();
    } catch (e) {
      console.error("Add failed", e);
      alert("Failed to add user");
    }
  }

  // ---------------------------
  // DELETE USER
  // ---------------------------
  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/Users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await loadUsers();
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  }

  // ---------------------------
  // START EDITING
  // ---------------------------
  function editRow(user) {
    setEditing(true);
    setCurrentUser({ ...user });
  }

  // ---------------------------
  // UPDATE USER
  // ---------------------------
  async function updateUser(id, updatedUser) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/Users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      setEditing(false);
      await loadUsers();
    } catch (e) {
      console.error("Update failed", e);
      alert("Update failed");
    }
  }

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="container">
      <h1 className="veera-animated-title">VEERA'S REACT</h1>


      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              
              <EditUserForm
                currentUser={currentUser}
                updateUser={updateUser}
                setEditing={setEditing}
              />
            </Fragment>
          ) : (
            <Fragment>
             
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>


   

        <div className="flex-large">
          
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
