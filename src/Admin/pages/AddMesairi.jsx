import image from "../../assets/cack2.jpg";
import { useEffect, useState } from "react";
import AddMesairiPopUp from "../component/AddMesairiPopup.jsx";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function AddMesairi() {
  const [open, setOpen] = useState(false);
  const [mesairi, setMesairi] = useState([]);
  const [editMesairi, setEditMesairi] = useState(null);

  useEffect(() => {
    const fetchMesairi = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/addmesairi");
        setMesairi(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMesairi();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addmesairi/${id}`);
      setMesairi(mesairi.filter((m) => m._id !== id));
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
          <h1 className="text-2xl font-bold text-center text-rose-700 mb-3">
            Mesairi Management
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Yahan aap apni <span className="font-semibold">Mesairi</span> add,
            edit aur delete kar sakte ho. Add button par click karne se popup
            open hoga.
          </p>
        </div>

        {/* Add Card */}
        <div className="bg-rose-100 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition">
          <img src={image} alt="mesairi" className="w-24 h-24 mb-4" />

          <button
            onClick={() => {
              setOpen(true);
              setEditMesairi(null);
            }}
            className="px-6 py-2 bg-rose-500 text-white rounded-lg font-semibold
            hover:bg-rose-600 transition transform hover:-translate-y-1"
          >
            + Add Mesairi
          </button>
        </div>
      </div>

      {/* Popup */}
      <AddMesairiPopUp
        isOpen={open}
        onClose={() => setOpen(false)}
        blogToEdit={editMesairi}
        onSuccess={(updated) => {
          if (editMesairi) {
            setMesairi(
              mesairi.map((m) => (m._id === updated._id ? updated : m))
            );
          } else {
            setMesairi([...mesairi, updated]);
          }
        }}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-bold text-rose-700 mb-4">
          All Mesairi
        </h2>

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
              {mesairi.length > 0 ? (
                mesairi.map((item) => (
                  <tr key={item._id} className="hover:bg-rose-50">
                    <td className="p-3 border font-medium">
                      {item.addMesairiTitle}
                    </td>

                    <td className="p-3 border text-sm text-gray-600 max-w-xs truncate">
                      {item.addMesairiParagraph}
                    </td>

                    <td className="p-3 border text-center">
                      <img
                        src={`http://localhost:5000${item.imageMesairiURL}`}
                        alt=""
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setEditMesairi(item);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1
                        bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <MdEdit /> Edit
                      </button>
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center gap-2 px-3 py-1
                        bg-rose-500 text-white rounded hover:bg-rose-600"
                      >
                        <AiFillDelete /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No Mesairi Found
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