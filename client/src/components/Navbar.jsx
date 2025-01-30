import { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

function Navbar() {
  const { credit, setShowLogin, user, logout } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        {" "}
        <img className="w-22 md:w-28" src={assets.favicon1} alt="" />{" "}
      </Link>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700"
          >
            <img className="w-5" src={assets.credit_icon} alt="" />
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Credits : {credit}{" "}
            </p>
          </button>
          <p className="text-gray-600 max-sm:hidden">Hi, {user}</p>
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 drop-shadow"
            />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md text-sm">
                <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowLogin(true)}
          className="bg-zinc-700 md:tracking-widest text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm md:text-md rounded-full transition-all duration-700 hover:scale-105 hover:bg-zinc-800 cursor-pointer"
        >
          Get Started{" "}
          <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
