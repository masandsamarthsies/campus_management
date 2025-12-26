import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("teachers/login/", loginData);

      alert("Login successful");

      // 👉 redirect to teacher home
      navigate("/teacher-home");

    } catch (error) {
      alert("Invalid email or password");
      console.log(error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Teacher Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default TeacherLogin;
