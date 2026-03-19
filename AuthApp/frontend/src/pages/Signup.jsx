import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }

    // setSignupInfo({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Signup</h1>

        <span>
          Already have an account?
          <Link to="/login">
            <span className="side-btn"> Login </span>
          </Link>
        </span>
      </div>

      <form action="" className="form" onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          autoFocus
          placeholder="Name"
          onChange={handleChange}
          value={signupInfo.name}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={signupInfo.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={signupInfo.password}
        />
        <button type="submit">Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
