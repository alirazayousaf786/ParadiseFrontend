import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCoursesPopUp({ isOpen, onClose, courseToEdit, onSuccess }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseParagraph, setCourseParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  //  Prefill data when editing
  useEffect(() => {
    if (courseToEdit) {
      setCourseTitle(courseToEdit.title || "");
      setCourseParagraph(courseToEdit.paragraph || "");
      setFile(null);
    } else {
      setCourseTitle("");
      setCourseParagraph("");
      setFile(null);
    }
  }, [courseToEdit]);

  // Drag & Drop handler
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedImage = e.dataTransfer.files[0];
    if (droppedImage) setFile(droppedImage);
  }, []);

  //  Add or Update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseTitle || !courseParagraph || (!file && !courseToEdit)) {
      toast.warn(" Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("paragraph", courseParagraph);
    if (file) formData.append("image", file); 

    try {
      setLoading(true);
      let res;

      if (courseToEdit) {
        // UPDATE COURSE
        res = await axios.put(
          `http://localhost:5000/api/addcourses/${courseToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Course updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // ADD COURSE
        res = await axios.post("http://localhost:5000/api/addcourses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(" Course added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      onSuccess(res.data);
      onClose();
      setCourseTitle("");
      setCourseParagraph("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading course:", error);
      toast.error(" Upload failed! Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg relative w-96">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            {courseToEdit ? "Edit Course" : "Add New Course"}
          </h2>

          {/* Image Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 transition-colors ${
              dragOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
            onClick={() => document.getElementById("courseFileInput").click()}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : courseToEdit?.imageURL ? (
              <img
                src={`http://localhost:5000${courseToEdit.imageURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2 rounded-md"
              />
            ) : (
              <p className="text-gray-500">
                Drag & Drop Course Image Here or Click to Select
              </p>
            )}
            <input
              id="courseFileInput"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-green-400"
            />
            <textarea
              placeholder="Course Description"
              value={courseParagraph}
              onChange={(e) => setCourseParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-green-400"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              {loading
                ? courseToEdit
                  ? "Updating..."
                  : "Uploading..."
                : courseToEdit
                ? "Update Course"
                : "Add Course"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
