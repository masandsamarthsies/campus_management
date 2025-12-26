import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP admin credentials
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center">Admin Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
