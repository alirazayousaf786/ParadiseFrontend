import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"

function AddPdf() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/register");
        setUsers(res.data);
      } catch (error) {
        console.log("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="addpdf-section">
      <div className="addpdf-container">
        <h1 className="addpdf-heading">All Registered Users</h1>

        {users.length === 0 ? (
          <p className="addpdf-empty">No users found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AddPdf;
