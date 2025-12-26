import { useEffect, useState } from "react";

const Modal = ({ show, close, save, data, setData }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (data?.image && typeof data.image === "string") {
      setPreview(`http://localhost:5000${data.image}`);
    }
  }, [data]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">
          {data._id ? "Update Blog" : "Add Blog"}
        </h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Blog Title"
          value={data.addBlogTitle}
          onChange={(e) =>
            setData({ ...data, addBlogTitle: e.target.value })
          }
          className="w-full border p-2 mb-3 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Blog Description"
          value={data.addBlogParagraph}
          onChange={(e) =>
            setData({ ...data, addBlogParagraph: e.target.value })
          }
          className="w-full border p-2 mb-3 rounded"
          rows="4"
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setData({ ...data, image: file });
            setPreview(URL.createObjectURL(file));
          }}
          className="mb-3"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-32 object-cover rounded mb-3"
          />
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
