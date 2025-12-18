import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaFileAlt,
  FaUserPlus,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminSideBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/addcourses", label: "Add Courses", icon: <FaBook /> },
    { to: "/admin/addblog", label: "Add Blog", icon: <FaFileAlt /> },
    { to: "/admin/addpdf", label: "Register User", icon: <FaUserPlus /> },
    { to: "/admin/message", label: "Message User", icon: <FaEnvelope /> },
  ];

  return (
    <div className="relative">
      {/* Toggle Button for mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-200 hover:bg-green-300"
      >
        {menuOpen ? <FaTimes className="text-xl " /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-64 min-h-screen bg-green-100 flex-col gap-2 p-4 text-black shadow-lg">
        <div className="text-2xl font-bold mb-6 text-center">AY Learning</div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-green-300 font-semibold" : "hover:bg-green-200"
              }`
            }
          >
            <span className="text-lg ">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-100 flex flex-col gap-2 p-4 text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-2xl font-bold mb-6 text-center">AY Learning</div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-green-300 font-semibold" : "hover:bg-green-200"
              }`
            }
            onClick={() => setMenuOpen(false)} // close menu on link click
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
