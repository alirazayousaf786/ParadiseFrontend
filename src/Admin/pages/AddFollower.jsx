import image from "../../assets/cack2.jpg";
import { useEffect, useState } from "react";
import AddBlogPopUp from "../component/AddBlogPopup.jsx";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function AddBlog() {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addblog");
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addblog/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="p-4 md:p-8 space-y-10">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Info Card */}
        <div className="bg-rose-100 rounded-xl p-6 shadow hover:shadow-lg transition">
          <h1 className="text-2xl font-bold text-center mb-3">
            Flower Management
          </h1>
          <p className="text-rose-900 leading-relaxed">
            You can add new Flower, edit existing ones, or delete them.
            Click the <span className="font-semibold">Add Flower</span> button
            to open the popup.
          </p>
        </div>

        {/* Add Blog Card */}
        <div className="bg-rose-100 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition">
          <img src={image} alt="blog" className="w-24 h-24 mb-4" />

          <button
            onClick={() => {
              setOpen(true);
              setEditBlog(null);
            }}
            className="px-6 text-2xl py-2 bg-rose-700 text-white rounded-lg font-semibold
            hover:bg-rose-900 transition transform hover:-translate-y-1"
          >
            + Add Flower
          </button>
        </div>
      </div>

      {/* Popup */}
      <AddBlogPopUp
        isOpen={open}
        onClose={() => setOpen(false)}
        blogToEdit={editBlog}
        onSuccess={(updatedBlog) => {
          if (editBlog) {
            setBlogs(
              blogs.map((b) =>
                b._id === updatedBlog._id ? updatedBlog : b
              )
            );
          } else {
            setBlogs([...blogs, updatedBlog]);
          }
        }}
      />

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4">All Flower Data</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-rose-200">
              <tr>
                <th className="p-3 border text-left">Title</th>
                <th className="p-3 border text-left">Price</th>
                <th className="p-3 border text-center">Image</th>
                <th className="p-3 border text-center">Edit</th>
                <th className="p-3 border text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">
                      {blog.addBlogTitle}
                    </td>

                    <td className="p-3 border text-sm text-gray-600 max-w-xs truncate">
                      {blog.addBlogParagraph}
                    </td>

                    <td className="p-3 border text-center">
                      <img
                        src={`http://localhost:5000${blog.imageBlogURL}`}
                        alt=""
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setEditBlog(blog);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1
                        bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <MdEdit /> Edit
                      </button>
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center gap-2 px-3 py-1
                        bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <AiFillDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No Found flower
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
