import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleTheme } from "./ToggleTheme";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const logout = UserAuth().logout;
  const user = UserAuth().user;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">Crypto-Bay</h1>
      </Link>
      <div className="hidden md:block">
        <ToggleTheme />
      </div>
      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            Account
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Menu button */}
      <div onClick={handleMenu} className="block md:hidden cursor-pointer z-10">
        {showMenu ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          showMenu
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleMenu} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleMenu} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="border-b py-6">
            <ToggleTheme />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/sigin">
            <button
            onClick={handleMenu}
            className="w-full my-2 p-3 bg-primary text-primary  border-secondary rounded-2xl shadow-xl">
              Sign In
            </button>
          </Link>
          <Link to="/sigup">
            <button
            onClick={handleMenu}
            className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shdow-xl">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
