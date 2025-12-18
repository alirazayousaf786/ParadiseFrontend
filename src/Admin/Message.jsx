import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Admin.css";

function AddPdf() {
  const [contact, setContact] = useState([]);

  // Fetch all contacts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setContact(res.data);
      } catch (error) {
        console.log("fetchContact Error here", error);
      }
    };
    fetchContact();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setContact(contact.filter(item => item._id !== id));
      console.log("Contact deleted successfully!");
    } catch (error) {
      console.log("Contact not Delete", error);
    }
  };

  return (
    <section className="addpdf-section">
      <div className="addpdf-container">
        <h1 className="addpdf-heading">All User Messages</h1>

        {contact.length === 0 ? (
          <p className="addpdf-empty">No messages found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((c, index) => (
                  <tr key={index}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.message}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
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
