import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

function AddTeacher() {
  const [teachers, setTeacher] = useState({
    name: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {
    setTeacher({ ...teachers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/teachers/register/",
        teachers
      );

      alert("Teacher registered successfully.\nDefault password: teacher@123");

      // clear form
      setTeacher({
        name: "",
        email: "",
        department: ""
      });

    } catch (error) {
      alert("Error registering teacher");
      console.error(error);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="container mt-5">
      <h3>Add Teacher</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Teacher Name"
          value={teachers.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={teachers.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="department"
          placeholder="Department"
          value={teachers.department}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success">
          Register Teacher
        </button>
      </form>
    </div>
    </>
  );
}

export default AddTeacher;
