import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import profileImg from "../assets/avator.png.webp";
import { Link, NavLink } from "react-router";
import "./navbar.css";

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSignOut = () => {
    signout()
      .then(() => console.log("User signed out"))
      .catch((error) => console.log(error.message));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allArticle">All Articles</NavLink></li>
      <li><NavLink to="/myArticles">My Articles</NavLink></li>
      <li><NavLink to="/postArticles">Post Articles</NavLink></li>
      <li><NavLink to="/aboutUs">About Us</NavLink></li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-base-100 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      {/* Left Side (Logo) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Modern Gradient Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
            EduHive
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {links}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || profileImg} alt="User Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><NavLink to="/myArticles">My Articles</NavLink></li>
              <li><NavLink to="/postArticles">Post Article</NavLink></li>
              <li><button onClick={handleSignOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold hover:opacity-90 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
