import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);
    
    // const formData = new FormData(form);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);


    //update user profile
    createUser(email, password)
  .then((result) => {
    console.log(result.user);
    updateProfile(result.user, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      navigate('/')
      toast.success("User Updated Profile Successfully!");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });


    //create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("User Registered Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className=" max-w-sm mx-auto  p-9 rounded-2xl mt-9 shadow-lg bg-base-200 mb-12">
      <h2 className="text-3xl mb-9">Please Register Now </h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        {/* name field */}
        <label className="label"> Name : </label>
        <input
          type="text"
          className="input"
          name="name"
          placeholder="Enter Your Name "
          required
        />
        {/* Photo-URL field */}

        <label className="label"> Photo-URL : </label>
        <input
          type="text"
          className="input"
          name="photo"
          placeholder="Enter Your Photo-URL "
        />

        <label className="label">Email : </label>
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Enter Your Email"
          required
        />

        <br />
        {/* Password field */}
        <label className="label">Password : </label>
        <label className="input validator">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            minLength="6"
            pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must be more than 6 characters, lowercase letter, uppercase letter"
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
        </label>
        <p className="validator-hint hidden">
          Must be more than 6 characters, including
          <br />
          {/* At least one number <br /> */}
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
        <br />
        {/* Submit Button */}

        <button type="submit" className="btn btn-neutral w-full mt-4">
          Register
        </button>
      </form>

      <p className="mt-3">
        Already have an account? Please{" "}
        <Link to="/login" className=" text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
