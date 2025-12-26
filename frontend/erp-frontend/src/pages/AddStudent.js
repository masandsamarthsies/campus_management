import React, { useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    roll_no: "",
    email: "",
    semester: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("students/register/", {
        name: student.name,
        roll_no: student.roll_no,
        email: student.email,
        semester: student.semester
      });

      alert("Student registered successfully. Default password: student@123");

      // clear form after success
      setStudent({
        name: "",
        roll_no: "",
        email: "",
        semester: ""
      });

    } catch (error) {
      alert("Error registering student");
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="container mt-5">
      <h3>Add Student</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="roll_no"
          placeholder="Roll Number"
          value={student.roll_no}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="semester"
          placeholder="Semester"
          value={student.semester}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          Register Student
        </button>
      </form>
    </div>
    </>
  );
}

export default AddStudent;
