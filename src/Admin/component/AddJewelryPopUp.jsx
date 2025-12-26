import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddJewelryPopUp({ isOpen, onClose, jewelryToEdit, onSuccess }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addJewelryTitle, setAddJewelryTitle] = useState("");
  const [addJewelryParagraph, setAddJewelryParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (jewelryToEdit) {
      setAddJewelryTitle(jewelryToEdit.addJewelryTitle || "");
      setAddJewelryParagraph(jewelryToEdit.addJewelryParagraph || "");
      setFile(null); // keep null to keep existing image
    } else {
      setAddJewelryTitle("");
      setAddJewelryParagraph("");
      setFile(null);
    }
  }, [jewelryToEdit]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addJewelryTitle || !addJewelryParagraph || (!file && !jewelryToEdit)) {
      toast.warn(" Please fill all fields and upload an image!", { position: "top-center", autoClose: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("addJewelryTitle", addJewelryTitle);
    formData.append("addJewelryParagraph", addJewelryParagraph);
    if (file) formData.append("imageJewelryURL", file);

    try {
      setLoading(true);
      let res;

      if (jewelryToEdit) {
        res = await axios.put(
          `http://localhost:5000/api/addjewelry/${jewelryToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Jewelry updated successfully!", { position: "top-right", autoClose: 4000 });
      } else {
        res = await axios.post("http://localhost:5000/api/addjewelry", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Jewelry added successfully!", { position: "top-right", autoClose: 4000 });
      }

      onSuccess(res.data); // notify parent to update state
      setAddJewelryTitle("");
      setAddJewelryParagraph("");
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
            {jewelryToEdit ? "Edit Jewelry" : "Add New Jewelry"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : jewelryToEdit?.imageJewelryURL ? (
              <img
                src={`http://localhost:5000${jewelryToEdit.imageJewelryURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop Jewelry Image Here or Click to Select</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto addjewelrypopup-input"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Jewelry Title"
              value={addJewelryTitle}
              onChange={(e) => setAddJewelryTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addjewelrypopup-input"
            />
            <textarea
              placeholder="Price"
              value={addJewelryParagraph}
              onChange={(e) => setAddJewelryParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addjewelrypopup-input"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all addjewelrypopup-button"
            >
              {loading ? (jewelryToEdit ? "Updating..." : "Uploading...") : jewelryToEdit ? "Update Jewelry" : "Add Jewelry"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
