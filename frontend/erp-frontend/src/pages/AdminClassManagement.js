import React, { useEffect, useState } from "react";
import api from "../services/api";

function AdminClassManagement() {
  // ---------- FIXED DROPDOWN DATA ----------
  const courses = [
    { id: "MCA", name: "MCA" },
    { id: "MMS", name: "MMS" },
  ];

  const semesters = [
    { id: 1, label: "Semester 1" },
    { id: 2, label: "Semester 2" },
    { id: 3, label: "Semester 3" },
    { id: 4, label: "Semester 4" },
  ];

  const academicYears = ["2025-26", "2026-27"];

  // ---------- STATE ----------
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [division, setDivision] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState([]);

  // ---------- LOAD CLASSES ON PAGE LOAD ----------
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/academics/classes/");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes", err);
    }
  };

  // ---------- CREATE CLASS ----------
  const createClass = async () => {
    if (!course || !semester || !division || !academicYear) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/academics/class/create/", {
        course: course,                 // MCA / MMS
        semester: Number(semester),     // 1,2,3,4 (INT)
        division: division,             // A / B
        academic_year: academicYear,
      });

      alert("Class created successfully");

      // Reset form
      setCourse("");
      setSemester("");
      setDivision("");
      setAcademicYear("");

      // Reload class list
      fetchClasses();
    } catch (err) {
      alert("Error creating class");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>Academic / Class Management</h1>

      <hr />

      {/* ================= CREATE CLASS ================= */}
      <h3>Create Class</h3>

      <div>
        <label>Course</label>
        <br />
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Semester</label>
        <br />
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {semesters.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Division</label>
        <br />
        <select value={division} onChange={(e) => setDivision(e.target.value)}>
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>

      <br />

      <div>
        <label>Academic Year</label>
        <br />
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {academicYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <br />

      <button onClick={createClass} disabled={loading}>
        {loading ? "Creating..." : "Create Class"}
      </button>

      <hr />

      {/* ================= CLASS LIST ================= */}
      <h3>Created Classes</h3>

      {classes.length === 0 ? (
        <p>No classes created yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Semester</th>
              <th>Division</th>
              <th>Academic Year</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.course}</td>
                <td>{cls.semester}</td>
                <td>{cls.division}</td>
                <td>{cls.academic_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      <p style={{ color: "gray" }}>
        Next steps: Add students → Assign subjects & faculty → Timetable → Room booking
      </p>
    </div>
  );
}

export default AdminClassManagement;
