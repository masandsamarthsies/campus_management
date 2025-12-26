import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
    const navigate = useNavigate();

useEffect(() => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  if (!isLoggedIn) {
    navigate("/admin-login");
  }
}, []);
  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-4 text-center">
            <h4>Register Student</h4>
            <Link to="/admin/add-student" className="btn btn-primary mt-3">
              Add Student
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 text-center">
            <h4>Register Teacher</h4>
            <Link to="/admin/add-teacher" className="btn btn-success mt-3">
              Add Teacher
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
