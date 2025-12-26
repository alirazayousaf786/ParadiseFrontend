import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCakePopUp({
  isOpen,
  onClose,
  cakeToEdit,
  onSuccess,
}) {
  const [dragCakeOver, setDragCakeOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addCakeTitle, setAddCakeTitle] = useState("");
  const [addCakeDescription, setAddCakeDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (cakeToEdit) {
      setAddCakeTitle(cakeToEdit.addCakeTitle || "");
      setAddCakeDescription(cakeToEdit.addCakeDescription || "");
      setFile(null);
    } else {
      setAddCakeTitle("");
      setAddCakeDescription("");
      setFile(null);
    }
  }, [cakeToEdit]);

  const handleDropCake = useCallback((e) => {
    e.preventDefault();
    setDragCakeOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addCakeTitle || !addCakeDescription || (!file && !cakeToEdit)) {
      toast.warn("Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("addCakeTitle", addCakeTitle);
    formData.append("addCakeDescription", addCakeDescription);
    if (file) formData.append("imageCakeURL", file);

    try {
      setLoading(true);
      let res;

      if (cakeToEdit) {
        // Update cake
        res = await axios.put(
          `http://localhost:5000/api/addcake/${cakeToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Cake updated successfully!");
      } else {
        // Add cake
        res = await axios.post(
          "http://localhost:5000/api/addcake",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Cake added successfully!");
      }

      onSuccess(res.data);
      setAddCakeTitle("");
      setAddCakeDescription("");
      setFile(null);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed! Try again.");
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
            {cakeToEdit ? "Edit Cake" : "Add New Cake"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragCakeOver(true);
            }}
            onDragLeave={() => setDragCakeOver(false)}
            onDrop={handleDropCake}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragCakeOver
                ? "border-green-400 bg-green-50"
                : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : cakeToEdit?.imageCakeURL ? (
              <img
                src={`http://localhost:5000${cakeToEdit.imageCakeURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">
                Drag & Drop Cake Image Here or Click to Select
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto addcakepopup-input"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Cake Title"
              value={addCakeTitle}
              onChange={(e) => setAddCakeTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 focus:outline-none focus:border-green-400 addcakepopup-input"
            />

            <textarea
              placeholder="Price"
              value={addCakeDescription}
              onChange={(e) => setAddCakeDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 focus:outline-none focus:border-green-400 addcakepopup-input"
              rows="3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all addcakepopup-button"
            >
              {loading
                ? cakeToEdit
                  ? "Updating..."
                  : "Uploading..."
                : cakeToEdit
                ? "Update Cake"
                : "Add Cake"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
