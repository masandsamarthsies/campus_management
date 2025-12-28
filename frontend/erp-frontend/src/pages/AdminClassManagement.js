import React, { useState } from "react";
import api from "../services/api";

function AdminClassManagement() {
  const [formData, setFormData] = useState({
    course: "",
    semester: "",
    division: "",
    academic_year: "",
  });

  const [loading, setLoading] = useState(false);

  const courses = ["MCA", "MMS"];
  const semesters = [1, 2, 3, 4];
  const academicYears = ["2025-26", "2026-27"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ GUARANTEED POST (NO GET)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚫 prevents GET request

    const { course, semester, division, academic_year } = formData;

    if (!course || !semester || !division || !academic_year) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/academics/class/create/", {
        course: course,
        semester: Number(semester),
        division: division,
        academic_year: academic_year,
      });

      alert(response.data.message || "Class created successfully");

      // reset form
      setFormData({
        course: "",
        semester: "",
        division: "",
        academic_year: "",
      });
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data || "Error creating class"));
    } finally {
      setLoading(false);
    }
  };

  // UI-only derived class name
  const classPreview =
    formData.course &&
    formData.semester &&
    formData.division &&
    formData.academic_year
      ? `${formData.course} Sem ${formData.semester} - ${formData.division} (${formData.academic_year})`
      : "—";

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3 text-center">Class Management</h3>

      <form onSubmit={handleSubmit}>
        {/* COURSE */}
        <div className="mb-3">
          <label className="form-label">Course</label>
          <select
            className="form-select"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* SEMESTER */}
        <div className="mb-3">
          <label className="form-label">Semester</label>
          <select
            className="form-select"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        {/* DIVISION */}
        <div className="mb-3">
          <label className="form-label">Division</label>
          <select
            className="form-select"
            name="division"
            value={formData.division}
            onChange={handleChange}
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        {/* ACADEMIC YEAR */}
        <div className="mb-3">
          <label className="form-label">Academic Year</label>
          <select
            className="form-select"
            name="academic_year"
            value={formData.academic_year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {academicYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* CLASS PREVIEW */}
        <div className="alert alert-info">
          <strong>Class Preview:</strong>
          <br />
          {classPreview}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Class"}
        </button>
      </form>
    </div>
  );
}

export default AdminClassManagement;
