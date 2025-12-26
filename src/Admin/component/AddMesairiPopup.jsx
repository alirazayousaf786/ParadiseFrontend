import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMesairiPopUp({ isOpen, onClose, blogToEdit, onSuccess }) {
  const [dragMesairiOver, setDragMesairiOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addMesairiTitle, setAddMesairiTitle] = useState("");
  const [addMesairiParagraph, setAddMesairiParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (blogToEdit) {
      setAddMesairiTitle(blogToEdit.addMesairiTitle || "");
      setAddMesairiParagraph(blogToEdit.addMesairiParagraph || "");
      setFile(null); // optional: keep null to keep existing image
    } else {
      setAddMesairiTitle("");
      setAddMesairiParagraph("");
      setFile(null);
    }
  }, [blogToEdit]);

  const handleDropMesairi = useCallback((e) => {
    e.preventDefault();
    setDragMesairiOver(false);
    const droppedMesairiFile = e.dataTransfer.files[0];
    if (droppedMesairiFile) setFile(droppedMesairiFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addMesairiTitle || !addMesairiParagraph || (!file && !blogToEdit)) {
      toast.warn("Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("addMesairiTitle", addMesairiTitle);
    formData.append("addMesairiParagraph", addMesairiParagraph);
    if (file) formData.append("imageMesairiURL", file);

    try {
      setLoading(true);
      let res;

      if (blogToEdit) {
        // Edit existing mesairi
        res = await axios.put(
          `http://localhost:5000/api/addmesairi/${blogToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Mesairi updated successfully!", { position: "top-right", autoClose: 4000 });
      } else {
        // Add new mesairi
        res = await axios.post("http://localhost:5000/api/addmesairi", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Mesairi added successfully!", { position: "top-right", autoClose: 4000 });
      }

      onSuccess(res.data); // notify parent to update state
      setAddMesairiTitle("");
      setAddMesairiParagraph("");
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
            {blogToEdit ? "Edit Mesairi" : "Add New Mesairi"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragMesairiOver(true); }}
            onDragLeave={() => setDragMesairiOver(false)}
            onDrop={handleDropMesairi}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragMesairiOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : blogToEdit?.imageMesairiURL ? (
              <img
                src={`http://localhost:5000${blogToEdit.imageMesairiURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop Mesairi Image Here or Click to Select</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto addblogpopup-input"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Mesairi Title"
              value={addMesairiTitle}
              onChange={(e) => setAddMesairiTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-green-400"
            />
            <textarea
              placeholder="Mesairi Description"
              value={addMesairiParagraph}
              onChange={(e) => setAddMesairiParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-green-400"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              {loading ? (blogToEdit ? "Updating..." : "Uploading...") : blogToEdit ? "Update Mesairi" : "Add Mesairi"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}