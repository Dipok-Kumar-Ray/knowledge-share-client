import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  console.log("Loacation in Login Page", location);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("hello from login");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
        //create user
    userLogin(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
        toast.success("User Logged In Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });

    // jwt start
    // fetch("https://eduhive-server-side.vercel.app/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     localStorage.setItem("token", data.token);
    //     navigate(from);
    //     toast.success("User Logged In Successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    //jwt end

  };

  return (
    <div className=" mt-8 mb-9 mx-auto card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-center text-3xl font-semi-bold ">Login now </h1>
        <form onSubmit={handleLogin} className="fieldset">
          {/* email */}
          <label className="label">Email : </label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Enter Your Email"
          />
          {/* password */}
          <label className="label">Password : </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Password"
              required
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              type="button"
              className="btn btn-xs absolute top-2 right-8"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            {/* forgot password */}
            <button onClick="" type="button" className="link link-hover">
              Forgot password?
            </button>
          </div>

          {/* <Link to='/'> */}
          <button type="submit" className="w-full btn btn-neutral mt-4">
            Login
          </button>
          {/* </Link> */}
        </form>
        <SocialLogin from={from} />
        <p className="mt-2 text-center">
          New to this site? Please
          <Link className="text-blue-500 underline" to="/register">
            Rigister
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
