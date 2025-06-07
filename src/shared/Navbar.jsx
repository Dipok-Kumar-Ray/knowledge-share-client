
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { NavLink, Link } from "react-router-dom"; 
// import profileImg from "../assets/avator.png.webp";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import profileImg from "../assets/avator.png.webp"
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignOut = () => {
    signout()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

    const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/">My Articles</NavLink>
      </li>
      <li>
        <NavLink to="/">Post Articles</NavLink>
      </li>
      <li>
        <NavLink to="/">About Us</NavLink>
      </li>
      </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className="flex items-center font-bold">
          <span className="text-3xl text-blue-400 font-bold">Edu</span>
          <span className="text-3xl text-green-400 font-bold">Hive</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {links}
          <button onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || profileImg} alt="User Profile" />
              </div>
            </label>
            <ul tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/my-articles">My Articles</NavLink>
              </li>
              <li>
                <NavLink to="/post-article">Post Article</NavLink>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;










// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { NavLink } from "react-router";
// import profileImg from "../assets/avator.png.webp"

// const Navbar = () => {
//   const { user, signout } = useContext(AuthContext);

//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme:dark)"
//     ).matches;

//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else if (systemPrefersDark) {
//       setTheme("dark");
//     }
//   }, []);

//   useEffect(() => {
//     const html = document.documentElement;
//     html.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const handleSignOut = () => {
//     signout()
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">All Articles</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">My Articles</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">Post Articles</NavLink>
//       </li>
//       <li>
//         <NavLink to="/">About Us</NavLink>
//       </li>
//       {/* for applicants links. check roles as well */}
//       {/* {
//     user && <>
//     <li><NavLink to="/myApplications">My Applications</NavLink></li>
//     </>
//   } */}
//       {/* for requiter.check role as well*/}
//       {/* {
//     user && <>
//     <li><NavLink to="/addJob">Add Job</NavLink></li>
//     <li><NavLink to="/myPostedJobs">My Posted Jobs</NavLink></li>
//     </>
//   } */}
//     </>
//   );
//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />{" "}
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div>
//         <div>
//           <span>
//             <img src="" alt="" />
//           </span>
//           <span className="text-3xl text-blue-300">Edu</span>
//           <span className="text-3xl text-green-300">Hive</span>
//         </div>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <NavLink to="/">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/myApplications">All Articles</NavLink>
//           </li>
//           <li>
//             <NavLink to="/addJob">My Articles</NavLink>
//           </li>
//           <li>
//             <NavLink to="/myPostedJobs">Post Articles</NavLink>
//           </li>
//           <li>
//             <NavLink to="">About Us</NavLink>
//           </li>
//         {/* Toggle Button */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//           aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//         >
//           {theme === "dark" ? "🌞" : "🌙"}
//         </button>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         {/* {user && (
//           <span className="text-blue-500 font-semibold">
//             {user.displayName}
//           </span>
//         )} */}

//         {

//         user ? (
//           <div className="flex items-center gap-2">
//            <span>
//             <img className="h-12 w-12 rounded-full" src={`${user ? user.photoURL : profileImg}`} alt="" />
//             <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <a className="justify-between">
//             Profile
//           </a>
//         </li>
//         <li><a>Settings</a></li>
//         <li><a>Logout</a></li>
//       </ul>
//            </span>
//           <button onClick={handleSignOut} className="btn ">
//             Sign Out
//           </button>
//           </div>

//         ) : (
//           <>
//             <NavLink className="btn" to="register">
//               Register
//             </NavLink>
//             <NavLink className="btn" to="login">
//               Login
//             </NavLink>
//           </>
//         )
//         }
//       </div>
//     </div>
//   );
// };

// export default Navbar;
