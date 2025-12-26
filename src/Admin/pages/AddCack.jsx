import image from "../../assets/cack2.jpg";
import { useEffect, useState } from "react";
import AddCakePopUp from "../component/AddCackPopUp.jsx";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function AddCake() {
  const [open, setOpen] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [editCake, setEditCake] = useState(null);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addcake");
        setCakes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCake();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addcake/${id}`);
      setCakes(cakes.filter((c) => c._id !== id));
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
            Cake Management
          </h1>
          <p className="text-rose-900 leading-relaxed">
            You can add new Cakes, edit existing ones, or delete them.
            Click the <span className="font-semibold">Add Cake</span> button
            to open the popup.
          </p>
        </div>

        {/* Add Cake Card */}
        <div className="bg-rose-100 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition">
          <img src={image} alt="cake" className="w-24 h-24 mb-4" />

          <button
            onClick={() => {
              setOpen(true);
              setEditCake(null);
            }}
            className="px-6 text-2xl py-2 bg-rose-700 text-white rounded-lg font-semibold
            hover:bg-rose-900 transition transform hover:-translate-y-1"
          >
            + Add Cake
          </button>
        </div>
      </div>

      {/* Popup */}
      <AddCakePopUp
        isOpen={open}
        onClose={() => setOpen(false)}
        cakeToEdit={editCake}
        onSuccess={(updatedCake) => {
          if (editCake) {
            setCakes(
              cakes.map((c) =>
                c._id === updatedCake._id ? updatedCake : c
              )
            );
          } else {
            setCakes([...cakes, updatedCake]);
          }
        }}
      />

      {/* Cakes Table */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4">All Cake Data</h2>

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
              {cakes.length > 0 ? (
                cakes.map((cake) => (
                  <tr key={cake._id} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">
                      {cake.addCakeTitle}
                    </td>

                    <td className="p-3 border text-sm text-gray-600 max-w-xs truncate">
                      {cake.addCakeDescription}
                    </td>

                    <td className="p-3 border text-center">
                      <img
                        src={`http://localhost:5000${cake.imageCakeURL}`}
                        alt=""
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setEditCake(cake);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1
                        bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <MdEdit /> Edit
                      </button>
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(cake._id)}
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
                    No Cake Found
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
