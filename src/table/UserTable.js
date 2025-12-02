import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/users";

const UserTable = ({ editRow }) => {
  const [users, setUsers] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const getAvatar = (user) => {
    const fn = user.firstname?.[0] ?? "?";
    const ln = user.lastname?.[0] ?? "";
    return (fn + ln).toUpperCase();
  };

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / recordsPerPage);

  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="card p-3 shadow-sm neon-card">
      <h4 className="fw-bold text-primary mb-3">User Table</h4>

      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Place</th>
            <th>Department</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td><div className="avatar-circle">{getAvatar(user)}</div></td>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.place}</td>
                <td>{user.department}</td>
                <td>{user.status}</td>

                <td className="text-center">
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => editRow(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-3 text-muted">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION UI */}
      {users.length > 10 && (
        <div className="d-flex justify-content-center mt-3">

          {/* Previous Button */}
          <button
            className="pagination-btn me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {/* Numbered Buttons */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`btn mx-1 ${
                num === currentPage
                  ? "page-number-active"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="pagination-btn ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default UserTable;
