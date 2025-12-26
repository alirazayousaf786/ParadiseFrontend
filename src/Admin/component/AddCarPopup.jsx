import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCarPopUp({ isOpen, onClose, carToEdit, onSuccess }) {
  const [dragCarOver, setDragCarOver] = useState(false);
  const [file, setFile] = useState(null);
  const [addCarTitle, setAddCarTitle] = useState("");
  const [addCarParagraph, setAddCarParagraph] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (carToEdit) {
      setAddCarTitle(carToEdit.addCarTitle || "");
      setAddCarParagraph(carToEdit.addCarParagraph || "");
      setFile(null); // optional: keep null to keep existing image
    } else {
      setAddCarTitle("");
      setAddCarParagraph("");
      setFile(null);
    }
  }, [carToEdit]);

  const handleDropCar = useCallback((e) => {
    e.preventDefault();
    setDragCarOver(false);
    const droppedCarFile = e.dataTransfer.files[0];
    if (droppedCarFile) setFile(droppedCarFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addCarTitle || !addCarParagraph || (!file && !carToEdit)) {
      toast.warn(" Please fill all fields and upload an image!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("addCarTitle", addCarTitle);
    formData.append("addCarParagraph", addCarParagraph);
    if (file) formData.append("imageCarURL", file);

    try {
      setLoading(true);
      let res;

      if (carToEdit) {
        // Edit existing car
        res = await axios.put(
          `http://localhost:5000/api/addcar/${carToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Car updated successfully!", { position: "top-right", autoClose: 4000 });
      } else {
        // Add new car
        res = await axios.post("http://localhost:5000/api/addcar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Car added successfully!", { position: "top-right", autoClose: 4000 });
      }

      onSuccess(res.data); // notify parent to update state
      setAddCarTitle("");
      setAddCarParagraph("");
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
            {carToEdit ? "Edit Car" : "Add New Car"}
          </h2>

          {/* Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragCarOver(true); }}
            onDragLeave={() => setDragCarOver(false)}
            onDrop={handleDropCar}
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
              dragCarOver ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <p className="text-green-600 font-semibold">{file.name}</p>
            ) : carToEdit?.imageCarURL ? (
              <img
                src={`http://localhost:5000${carToEdit.imageCarURL}`}
                alt="preview"
                className="mx-auto w-24 h-24 object-cover mb-2"
              />
            ) : (
              <p className="text-gray-500">Drag & Drop Car Image Here or Click to Select</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mx-auto addcarpopup-input"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Car Title"
              value={addCarTitle}
              onChange={(e) => setAddCarTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addcarpopup-input"
            />
            <textarea
              placeholder="Price"
              value={addCarParagraph}
              onChange={(e) => setAddCarParagraph(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3  focus:outline-none focus:border-green-400 addcarpopup-input"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all addcarpopup-button"
            >
              {loading ? (carToEdit ? "Updating..." : "Uploading...") : carToEdit ? "Update Car" : "Add Car"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}