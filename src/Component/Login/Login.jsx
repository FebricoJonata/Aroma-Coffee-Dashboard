import { Navigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import NET from 'vanta/dist/vanta.net.min';
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const vantaRef = useRef(null);

  useEffect(() => {
    // Ensure the component is fully mounted before initializing Vanta.NET
    if (!vantaRef.current) return;

    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x8c6b0a,
      backgroundColor: 0x20202,
    });

    // Cleanup effect on component unmount
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const handleLogin = () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      alert("Admin logged in successfully");
      setLoggedIn(true);
    } else {
      alert("Invalid credentials. Only admin can log in.");
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div id="login">
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
