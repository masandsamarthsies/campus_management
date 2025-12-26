import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();   // 👈 navigation hook

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("students/login/", loginData);

      alert("Login successful");

      // 👉 redirect to student home
      navigate("/student-home");

    } catch (error) {
      alert("Invalid email or password");
      console.log(error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">

          <h3 className="text-center mb-4">Student Login</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
