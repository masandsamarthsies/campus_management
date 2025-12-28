import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ClassManagePage() {
  const { classId } = useParams();

  // ================= BASIC =================
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("students");

  // ================= STUDENTS =================
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  // ================= SUBJECTS =================
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [selectedTeachers, setSelectedTeachers] = useState({});

  // Add Subject
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectTeacher, setNewSubjectTeacher] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchClass();
    fetchStudents();
    fetchSubjectsAndTeachers();
  }, []);

  const fetchClass = async () => {
    try {
      const res = await api.get(`/academics/class/${classId}/`);
      setClassData(res.data);
    } catch {
      alert("Error loading class");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    const enrolled = await api.get(
      `/academics/class/${classId}/students/`
    );
    const available = await api.get(
      `/academics/class/${classId}/available-students/`
    );
    setEnrolledStudents(enrolled.data);
    setAvailableStudents(available.data);
  };

  const fetchSubjectsAndTeachers = async () => {
    const subRes = await api.get(
      `/academics/class/${classId}/subjects/`
    );
    const teachRes = await api.get("/academics/teachers/");
    const assignRes = await api.get(
      `/academics/class/${classId}/teaching-assignments/`
    );

    setSubjects(subRes.data);
    setTeachers(teachRes.data);

    const map = {};
    assignRes.data.forEach((a) => {
      map[a.subject] = a.teacher;
    });
    setAssignments(map);
  };

  // ================= STUDENT ACTIONS =================
  const addStudent = async () => {
    if (!selectedStudent) return;

    await api.post("/academics/class/student/add/", {
      class_id: classId,
      student_id: selectedStudent,
    });

    setSelectedStudent("");
    fetchStudents();
  };

  const removeStudent = async (id) => {
    if (!window.confirm("Remove student from class?")) return;
    await api.delete(
      `/academics/class/student/remove/${id}/`
    );
    fetchStudents();
  };

  // ================= SUBJECT ACTIONS =================
  const assignTeacher = async (subjectId) => {
    const teacherId = selectedTeachers[subjectId];
    if (!teacherId) return;

    await api.post("/academics/class/assign-teacher/", {
      class_id: classId,
      subject_id: subjectId,
      teacher_id: teacherId,
    });

    fetchSubjectsAndTeachers();
  };

  const addSubject = async () => {
    if (!newSubjectName || !newSubjectTeacher) {
      alert("Fill all fields");
      return;
    }

    await api.post("/academics/class/add-subject/", {
      class_id: classId,
      subject_name: newSubjectName,
      teacher_id: newSubjectTeacher,
    });

    setNewSubjectName("");
    setNewSubjectTeacher("");
    setShowAddSubject(false);
    fetchSubjectsAndTeachers();
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!classData)
    return <div className="container mt-4">Class not found</div>;

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="card p-3 shadow-sm mb-4">
        <h4 className="mb-0">
          {classData.course} Sem {classData.semester} –{" "}
          {classData.division}
          <span className="text-muted fs-6">
            {" "}
            ({classData.academic_year})
          </span>
        </h4>
      </div>

      {/* TABS */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "students" ? "active" : ""
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "subjects" ? "active" : ""
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            Subjects & Faculty
          </button>
        </li>
      </ul>

      {/* ================= STUDENTS TAB ================= */}
      {activeTab === "students" && (
        <div className="card p-3 shadow-sm">
          <h5>Add Student</h5>

          <select
            className="form-select mb-2"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select Student</option>
            {availableStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>

          <button className="btn btn-success mb-3" onClick={addStudent}>
            Add Student
          </button>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Sem</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No students enrolled
                  </td>
                </tr>
              ) : (
                enrolledStudents.map((cs) => (
                  <tr key={cs.id}>
                    <td>{cs.student_name}</td>
                    <td>{cs.student_email}</td>
                    <td>{cs.student_course}</td>
                    <td>{cs.student_semester}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeStudent(cs.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= SUBJECTS TAB ================= */}
      {activeTab === "subjects" && (
        <div className="card p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Subjects</h5>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowAddSubject(!showAddSubject)}
            >
              + Add Subject
            </button>
          </div>

          {showAddSubject && (
            <div className="card p-3 my-3 bg-light">
              <input
                className="form-control mb-2"
                placeholder="Subject Name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />

              <select
                className="form-select mb-2"
                value={newSubjectTeacher}
                onChange={(e) => setNewSubjectTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <button className="btn btn-success" onClick={addSubject}>
                Save Subject
              </button>
            </div>
          )}

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Subject</th>
                <th>Assigned Teacher</th>
                <th>Change Teacher</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td>
                    {teachers.find(
                      (t) => t.id === assignments[sub.id]
                    )?.name || "Not Assigned"}
                  </td>
                  <td>
                    <select
                      className="form-select mb-1"
                      onChange={(e) =>
                        setSelectedTeachers({
                          ...selectedTeachers,
                          [sub.id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => assignTeacher(sub.id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClassManagePage;
