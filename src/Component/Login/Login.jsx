import { Navigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      Swal.fire("Logged in!", "Admin logged in successfully", "success");
      setLoggedIn(true);
    } else {
      Swal.fire("Invalid Crendentials!", "Only admin can log in.", "error");
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div id="login">
      <div className="login-content">
        <h1>Login</h1>
        <form>
          <div className="input-content">
            <label>
              Email
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Here"
                required
              />
            </label>
          </div>
          <div className="input-content">
            <label>
              Password
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password Here"
                required
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="primary-button"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
