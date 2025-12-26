import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBirthdayPopUp({ isOpen, onClose, birthdayToEdit, onSuccess }) {
  const [dragBirthdayOver, setDragBirthdayOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addBirthdayTitle, setAddBirthdayTitle] = useState("");
  const [addBirthdayParagraph, setAddBirthdayParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (birthdayToEdit) {
      setAddBirthdayTitle(birthdayToEdit.addBirthdayTitle || "");
      setAddBirthdayParagraph(birthdayToEdit.addBirthdayParagraph || "");
      setFile(null); // optional: keep null to keep existing image
    } else {
      setAddBirthdayTitle("");
      setAddBirthdayParagraph("");
      setFile(null);
    }
  }, [birthdayToEdit]);

  const handleDropBirthday = useCallback((e) => {
    e.preventDefault();
    setDragBirthdayOver(false);
    const droppedBirthdayFile = e.dataTransfer.files[0];
    if (droppedBirthdayFile) setFile(droppedBirthdayFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addBirthdayTitle || !addBirthdayParagraph || (!file && !birthdayToEdit)) {
      toast.warn(" Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("addBirthdayTitle", addBirthdayTitle);
    formData.append("addBirthdayParagraph", addBirthdayParagraph);
    if (file) formData.append("imageBirthdayURL", file);

    try {
      setLoading(true);
      let res;

      if (birthdayToEdit) {
        // Edit existing birthday
        res = await axios.put(
          `http://localhost:5000/api/addbirthday/${birthdayToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Birthday updated successfully!", { position: "top-right", autoClose: 4000 });
      } else {
        // Add new birthday
        res = await axios.post("http://localhost:5000/api/addbirthday", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Birthday added successfully!", { position: "top-right", autoClose: 4000 });
      }

      onSuccess(res.data); // notify parent to update state
      setAddBirthdayTitle("");
      setAddBirthdayParagraph("");
      setFile(null);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed! Try again.", { position: "top-right", autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg relative w-96">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            {birthdayToEdit ? "Edit Birthday" : "Add New Birthday"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragBirthdayOver(true); }}
            onDragLeave={() => setDragBirthdayOver(false)}
            onDrop={handleDropBirthday}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragBirthdayOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : birthdayToEdit?.imageBirthdayURL ? (
              <img
                src={`http://localhost:5000${birthdayToEdit.imageBirthdayURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop Birthday Image Here or Click to Select</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto addbirthdaypopup-input"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Birthday Title"
              value={addBirthdayTitle}
              onChange={(e) => setAddBirthdayTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addbirthdaypopup-input"
            />
            <textarea
              placeholder="Price"
              value={addBirthdayParagraph}
              onChange={(e) => setAddBirthdayParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addbirthdaypopup-input"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all addbirthdaypopup-button"
            >
              {loading ? (birthdayToEdit ? "Updating..." : "Uploading...") : birthdayToEdit ? "Update Birthday" : "Add Birthday"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}