import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMenuOpen((prev) => !prev);
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pregnancy Tracker", path: "/pregnancy" },
    { name: "Newborn Tracker", path: "/newborn" },
    { name: "Nutrition", path: "/nutrition" },
  ];

  return (
    <nav className="bg-ivory text-charcoal">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink">
          Momma's Care
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex flex-1 justify-center space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-pink hover:text-ivory hover:bg-pink rounded p-2 transition-colors duration-200 font-bold"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex space-x-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-darkpink text-white px-4 py-2 rounded-lg hover:bg-pink transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 p-6"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMobileMenu}
                className="block text-pink hover:text-ivory hover:bg-pink rounded p-2 text-lg"
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="block bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMobileMenu}
                  className="block bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMobileMenu}
                  className="block bg-pink text-white px-4 py-2 rounded-lg hover:bg-darkpink"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    handleLogout();
                  }}
                  className="block w-full text-left bg-darkpink text-white px-4 py-2 rounded-lg hover:bg-pink"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
