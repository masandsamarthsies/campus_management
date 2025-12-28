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
      await axios.post(
        "http://127.0.0.1:8000/api/teachers/register/",
        {
          name: teachers.name,
          email: teachers.email,
          department: teachers.department   // MCA / MMS
        }
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
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <h3>Add Teacher</h3>

        <form onSubmit={handleSubmit}>

          {/* TEACHER NAME */}
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Teacher Name"
            value={teachers.name}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={teachers.email}
            onChange={handleChange}
            required
          />

          {/* DEPARTMENT DROPDOWN */}
          <select
            className="form-control mb-3"
            name="department"
            value={teachers.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="MCA">MCA</option>
            <option value="MMS">MMS</option>
          </select>

          <button className="btn btn-success">
            Register Teacher
          </button>

        </form>
      </div>
    </>
  );
}

export default AddTeacher;
