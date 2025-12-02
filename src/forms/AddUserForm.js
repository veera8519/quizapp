// src/forms/AddUserForm.js
import React, { useState } from "react";

const AddUserForm = ({ addUser }) => {
  const initialFormState = {
    Firstname: "",
    Lastname: "",
    email: "",
    contact: "",
    Place: "",
    Department: "",
    status: "Active",
  };

  const [user, setUser] = useState(initialFormState);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      await addUser(user);
  alert("User added successfully!");
    setUser(initialFormState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 shadow-sm fade-in-row"
      style={{ borderRadius: "15px" }}
    >
      <h4 className="fw-bold text-primary mb-3">Add User</h4>

      {/* First Name */}
      <div className="modern-input-group mb-3">
        <i className="bi bi-person input-icon"></i>
        <input
          name="Firstname"
          className="form-control modern-input"
          placeholder="First Name"
          value={user.Firstname}
          onChange={handleChange}
          required
        />
        <label className="floating-label">First Name</label>
      </div>

      {/* Last Name */}
      <div className="modern-input-group mb-3">
        <i className="bi bi-person input-icon"></i>
        <input
          name="Lastname"
          className="form-control modern-input"
          placeholder="Last Name"
          value={user.Lastname}
          onChange={handleChange}
          required
        />
        <label className="floating-label">Last Name</label>
      </div>

      {/* Email */}
      <div className="modern-input-group mb-3">
        <i className="bi bi-envelope input-icon"></i>
        <input
          type="email"
          name="email"
          className="form-control modern-input"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label className="floating-label">Email</label>
      </div>

      {/* Contact */}
      <div className="modern-input-group mb-3">
        <i className="bi bi-telephone input-icon"></i>
        <input
          name="contact"
          className="form-control modern-input"
          placeholder="Contact"
          value={user.contact}
          onChange={handleChange}
          required
        />
        <label className="floating-label">Contact</label>
      </div>

      {/* Place */}
      <div className="modern-input-group mb-3">
        <i className="bi bi-geo-alt input-icon"></i>
        <input
          name="Place"
          className="form-control modern-input"
          placeholder="Place"
          value={user.Place}
          onChange={handleChange}
          required
        />
        <label className="floating-label">Place</label>
      </div>

<br/>

<div className="modern-input-group mb-3">
        <i className="bi bi-building input-icon"></i>
        <select
          name="Department"
          className="form-select modern-input"
          value={user.Department}
          onChange={handleChange}
          required
        >
          <option value=""></option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Admin">Admin</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
        <label className="floating-label">Department</label>
      </div>



      {/* Status */}
      <label className="form-label">Status</label>

      <div className="modern-radio-group mb-3">
        <label className="modern-radio">
          <input
            type="radio"
            name="status"
            value="Active"
            checked={user.status === "Active"}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          Active
        </label>

        <label className="modern-radio">
          <input
            type="radio"
            name="status"
            value="Inactive"
            checked={user.status === "Inactive"}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          Inactive
        </label>
      </div>

      <button className="btn btn-primary w-100 rounded-3 ripple mt-2">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
