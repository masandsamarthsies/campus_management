import React, { useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    roll_no: "",
    email: "",
    course: "",
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
        course: student.course,               // MCA / MMS
        semester: Number(student.semester)    // 1,2,3,4
      });

      alert("Student registered successfully. Default password: student@123");

      // clear form after success
      setStudent({
        name: "",
        roll_no: "",
        email: "",
        course: "",
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

          {/* STUDENT NAME */}
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
            required
          />

          {/* ROLL NUMBER */}
          <input
            className="form-control mb-3"
            name="roll_no"
            placeholder="Roll Number"
            value={student.roll_no}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
          />

          {/* COURSE DROPDOWN */}
          <select
            className="form-control mb-3"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="MCA">MCA</option>
            <option value="MMS">MMS</option>
          </select>

          {/* SEMESTER DROPDOWN */}
          <select
            className="form-control mb-3"
            name="semester"
            value={student.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
          </select>

          <button className="btn btn-primary">
            Register Student
          </button>

        </form>
      </div>
    </>
  );
}

export default AddStudent;
