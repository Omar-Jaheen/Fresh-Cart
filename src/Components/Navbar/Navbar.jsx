import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import Logo from "../../assets/freshcart-logo.svg";
import { CartContext } from "../../../Context/CartContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { numberOfCartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-gray-100 border-gray-200 fixed top-0 right-0 left-0 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* Logo & Menu Icon */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img src={Logo} className="h-8" alt="Fresh cart logo" />
          </Link>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-5 w-full lg:w-auto bg-gray-100 lg:bg-transparent p-4 lg:p-0 absolute lg:static top-16 left-0 right-0 shadow-md lg:shadow-none`}
        >
          {userLogin && (
            <ul className="flex flex-col lg:flex-row gap-5 w-full lg:w-auto text-center lg:text-left">
              <li><Link to="/">Home</Link></li>
              <li className="relative">
                <Link to="/cart">
                  Cart
                  <span className="absolute top-[-10px] right-[-10px] bg-stone-800 text-white rounded-full size-5 flex items-center justify-center p-2">
                    {numberOfCartItems}
                  </span>
                </Link>
              </li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/brands">Brands</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/userOrders/:id">Orders</Link></li>
            </ul>
          )}
        </div>

        {/* Social Links & Auth Buttons */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex gap-5">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>

          {userLogin ? (
            <span className="cursor-pointer" onClick={signOut}>Signout</span>
          ) : (
            <ul className="flex gap-5">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
