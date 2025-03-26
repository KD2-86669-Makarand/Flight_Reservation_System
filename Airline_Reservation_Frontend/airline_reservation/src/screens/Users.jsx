import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import AdminNavbar from "../Components/AdminNavbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    status: "ACTIVE",
    role: "ADMIN", // Always default to ADMIN
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new user (Ensure role is always ADMIN)
  const handleAddUser = () => {
    const newUser = { ...formData, role: "ADMIN" }; // Enforce ADMIN role

    axios
      .post("http://localhost:8080/users/add", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        resetForm();
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  // Edit user details
  const handleEdit = (user) => {
    setFormData({ ...user, password: "" }); // Prevent showing the password field
    setIsEditing(true);
  };

  // Update user (Keep role as ADMIN)
  const handleUpdateUser = () => {
    const updatedUser = { ...formData, role: "ADMIN" }; // Enforce ADMIN role

    axios
      .put(`http://localhost:8080/users/update/${formData.id}`, updatedUser)
      .then((response) => {
        setUsers(
          users.map((user) => (user.id === formData.id ? response.data : user))
        );
        resetForm();
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeactivate = (id) => {
    axios
      .put(`http://localhost:8080/users/delete/${id}/deactivate`)
      .then(() => {
        // Update UI: Change status to INACTIVE
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, status: "INACTIVE" } : user
          )
        );
      })
      .catch((error) => console.error("Error deactivating user:", error));
  };

  // Reset form (Always set role to ADMIN)
  const resetForm = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      status: "ACTIVE",
      role: "ADMIN", // Always default to USER
    });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <header>
        <AdminNavbar />
      </header>
      <h2>User List</h2>

      {/* User Form */}
      <div className="form-container">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        {/* Role dropdown is disabled to keep role as ADMIN */}
        <select name="role" value={formData.role} disabled>
          <option value="ADMIN">Admin</option>
        </select>
        <button onClick={isEditing ? handleUpdateUser : handleAddUser}>
          {isEditing ? "Update User" : "Add Admin"}
        </button>
        {isEditing && (
          <button onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dob}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="deactivate-btn"
                  onClick={() => handleDeactivate(user.id)}
                  disabled={user.status === "INACTIVE"} // Disable button if already inactive
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
