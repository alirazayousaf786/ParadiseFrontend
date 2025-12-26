import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBlogPopUp({ isOpen, onClose, blogToEdit, onSuccess }) {
  const [dragBlogOver, setDragBlogOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addBlogTitle, setAddBlogTitle] = useState("");
  const [addBlogParagraph, setAddBlogParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (blogToEdit) {
      setAddBlogTitle(blogToEdit.addBlogTitle || "");
      setAddBlogParagraph(blogToEdit.addBlogParagraph || "");
      setFile(null); // optional: keep null to keep existing image
    } else {
      setAddBlogTitle("");
      setAddBlogParagraph("");
      setFile(null);
    }
  }, [blogToEdit]);

  const handleDropBlog = useCallback((e) => {
    e.preventDefault();
    setDragBlogOver(false);
    const droppedBlogFile = e.dataTransfer.files[0];
    if (droppedBlogFile) setFile(droppedBlogFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addBlogTitle || !addBlogParagraph || (!file && !blogToEdit)) {
      toast.warn(" Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("addBlogTitle", addBlogTitle);
    formData.append("addBlogParagraph", addBlogParagraph);
    if (file) formData.append("imageBlogURL", file);

    try {
      setLoading(true);
      let res;

      if (blogToEdit) {
        // Edit existing blog
        res = await axios.put(
          `http://localhost:5000/api/addblog/${blogToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Blog updated successfully!", { position: "top-right", autoClose: 4000 });
      } else {
        // Add new blog
        res = await axios.post("http://localhost:5000/api/addblog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Blog added successfully!", { position: "top-right", autoClose: 4000 });
      }

      onSuccess(res.data); // notify parent to update state
      setAddBlogTitle("");
      setAddBlogParagraph("");
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
            {blogToEdit ? "Edit Blog" : "Add New Blog"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragBlogOver(true); }}
            onDragLeave={() => setDragBlogOver(false)}
            onDrop={handleDropBlog}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragBlogOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : blogToEdit?.imageBlogURL ? (
              <img
                src={`http://localhost:5000${blogToEdit.imageBlogURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop Blog Image Here or Click to Select</p>
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
              placeholder="Flower Title"
              value={addBlogTitle}
              onChange={(e) => setAddBlogTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addblogpopup-input"
            />
            <textarea
              placeholder="Price"
              value={addBlogParagraph}
              onChange={(e) => setAddBlogParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addblogpopup-input"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all addblogpopup-button"
            >
              {loading ? (blogToEdit ? "Updating..." : "Uploading...") : blogToEdit ? "Update Flower" : "Add Flower"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
