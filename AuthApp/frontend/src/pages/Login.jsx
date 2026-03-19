import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, email } = result;

      if (success) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
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
        <h1>Login</h1>

        <span>
          Don't have an account?
          <Link to="/signup">
            <span className="side-btn"> Signup </span>
          </Link>
        </span>
      </div>

      <form action="" className="form" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={loginInfo.email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={loginInfo.password}
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
