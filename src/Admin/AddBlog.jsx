import "./Admin.css";
import image from "../../assets/images/books.png"; // fallback image
import { useEffect, useState } from "react";
import AddBlogPopUp from "../../Page/Admin/AddBlogPopUp";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
export default function AddBlog() {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null); // state to hold blog being edited

  // Fetch blogs
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addblog");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlog();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addblog/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <section>
      <div className="w-full flex items-center justify-between gap-10 addcoursrs-first-main">
        {/* Left Info Section */}
        <div className="w-1/2 bg-green-200 rounded-lg addcoursrs-first-main-left hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
          <h1 className="text-2xl font-bold flex justify-center items-center">Blogs</h1>
          <p className="text-md">
            You can add new blogs here, and to add one, you will need to click 
            on the "Add" button, which will open a popup. On this page, you can 
            also view all your blogs and have the option to edit or delete them.
          </p>
        </div>

        {/* Right Image + Button */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-40 h-[8.75rem] flex bg-green-200 items-center justify-center rounded-lg flex-col cursor-pointer">
            <div>
              <img src={image} alt="image.png" className="w-20 h-20" />
            </div>
            <div>
              <button
                className="w-34 h-10 bg-green-300 hover:bg-green-500 cursor-pointer rounded-lg text-xl font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500"
                onClick={() => { setOpen(true); setEditBlog(null); }}
              >
                Add Blog
              </button>

              {/* Blog Pop-up */}
              <AddBlogPopUp
                isOpen={open}
                onClose={() => setOpen(false)}
                blogToEdit={editBlog}
                onSuccess={(updatedBlog) => {
                  if (editBlog) {
                    // update existing blog
                    setBlogs(blogs.map(b => b._id === updatedBlog._id ? updatedBlog : b));
                  } else {
                    // add new blog
                    setBlogs([...blogs, updatedBlog]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
     <div className="addblog-section">
  <div className="addblog-container">
    <h1 className="addblog-heading">All Blogs</h1>

    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.addBlogTitle}</td>
                <td>{blog.addBlogParagraph}</td>
                <td>
                  <img
                    src={`http://localhost:5000${blog.imageBlogURL}`}
                    alt={blog.addBlogTitle}
                    className="table-img"
                  />
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setOpen(true);
                      setEditBlog(blog);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MdEdit /> Edit
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <AiFillDelete /> Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="addblog-empty">
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </section>
  );
}
