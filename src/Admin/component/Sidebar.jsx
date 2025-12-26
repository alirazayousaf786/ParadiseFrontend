import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-rose-500 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold text-rose-400">Admin Panel</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 w-60 min-h-screen bg-gray-800 p-4
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Desktop Title */}
        <h2 className="hidden md:block text-xl font-bold mb-6 text-rose-400">
          Admin Panel
        </h2>

        <ul className="space-y-3 mt-10 md:mt-0">
          <li>
            <NavLink to="/admin" end className={linkClass} onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-follower" className={linkClass} onClick={() => setOpen(false)}>
              Add Follower
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-mesairi" className={linkClass} onClick={() => setOpen(false)}>
              Add Mesairi
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-cardecoration" className={linkClass} onClick={() => setOpen(false)}>
              Add Car Decoration
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/add-addbrithday" className={linkClass} onClick={() => setOpen(false)}>
              Add Birthday
            </NavLink>
          </li>
           <li>
            <NavLink to="/admin/add-stage" className={linkClass} onClick={() => setOpen(false)}>
              Add Stage
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-cack" className={linkClass} onClick={() => setOpen(false)}>
              Add Cack
            </NavLink>
          </li>
           <li>
            <NavLink to="/admin/add-jewelry" className={linkClass} onClick={() => setOpen(false)}>
              Add Jewelry
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/promotion" className={linkClass} onClick={() => setOpen(false)}>
              Add Percentage
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
