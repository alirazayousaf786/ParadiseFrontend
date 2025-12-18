import "./Admin.css";
import image from "../../assets/images/books.png";
import { useEffect, useState } from "react";
import AddCoursesPopUp from "../../Page/Admin/AddCoursesPopUp";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function AddCourses() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addcourses");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  //  Delete course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addcourses/${id}`);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <section>
      {/* Top Info Section */}
      <div className="w-full flex items-center justify-between gap-10 addcoursrs-first-main">
        {/* Left Info */}
        <div className="w-1/2 bg-green-200 rounded-lg addcoursrs-first-main-left hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
          <h1 className="text-2xl font-bold flex justify-center items-center">
            Courses
          </h1>
          <p className="text-md">
            You can add new courses here, and to add one, click on the "Add"
            button, which will open a popup. On this page, you can view all your
            courses and have the option to edit or delete them.
          </p>
        </div>

        {/* Right Image and Add Button */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-40 h-[8.75rem] flex bg-green-200 items-center justify-center rounded-lg flex-col cursor-pointer">
            <div>
              <img src={image} alt="image.png" className="w-20 h-20" />
            </div>
            <div>
              <button
                className="w-34 h-10 bg-green-300 hover:bg-green-500 cursor-pointer rounded-lg text-xl font-bold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  setOpen(true);
                  setEditCourse(null);
                }}
              >
                Add Course
              </button>

              {/* Popup Component */}
              <AddCoursesPopUp
                isOpen={open}
                onClose={() => setOpen(false)}
                courseToEdit={editCourse}
                onSuccess={(updatedCourse) => {
                  if (editCourse) {
                    setCourses(
                      courses.map(c =>
                        c._id === updatedCourse._id ? updatedCourse : c
                      )
                    );
                  } else {
                    setCourses([...courses, updatedCourse]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/*  Table Section */}
     <div className="addcourse-section">
  <div className="addcourse-container">
    <h1 className="addcourse-heading">All Courses</h1>

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
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.paragraph}</td>
                <td>
                  <img
                    src={`http://localhost:5000${course.imageURL}`}
                    alt={course.courseTitle}
                    className="table-img"
                  />
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setOpen(true);
                      setEditCourse(course);
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
                    onClick={() => handleDelete(course._id)}
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
              <td colSpan="5" className="addcourse-empty">
                No courses found
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
