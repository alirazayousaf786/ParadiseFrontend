import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import imge from "../assets/logo.jpg"
const Header = () => {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-rose-600 font-semibold border-b-2 border-rose-600 pb-1"
      : "text-gray-700 hover:text-rose-600 transition";

  return (
    <header className="bg-rose-100/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-20 h-20 bg-rose-600 text-white flex items-center justify-center rounded-full font-bold">
            <img
                       src={imge}
                       alt="Founder"
                       className="w-20 h-20  object-cover bg-center rounded-full "
                     />
          </div>
          <span className="text-xl font-bold text-rose-700">
            Flower Shop
          </span>
        </Link>

        {/* NAV LINKS (DESKTOP) */}
        <nav className="hidden md:flex gap-8 text-sm">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/product" className={navClass}>Product</NavLink>
          <NavLink to="/service" className={navClass}>Service</NavLink>
        </nav>

        {/* CONTACT BUTTON */}
        <div className="hidden md:block">
          <Link to="/contact">
            <button className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 shadow-md transition">
              Contact Me
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-rose-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-rose-50 px-6 pb-6 rounded-b-2xl shadow-inner">
          <nav className="flex flex-col gap-5 text-center text-base">
            <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/product" className={navClass} onClick={() => setOpen(false)}>Product</NavLink>
            <NavLink to="/service" className={navClass} onClick={() => setOpen(false)}>Service</NavLink>

            <Link to="/contact" onClick={() => setOpen(false)}>
              <button className="mt-3 bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 w-full">
                Contact Me
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
