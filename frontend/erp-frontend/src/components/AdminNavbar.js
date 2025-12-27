import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/student-home">
          Admin Panel
        </Link>

        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link to="/admin/class-management" className="btn btn-primary mt-3">
                          Add Student
                        </Link>
          </li>


          <li className="nav-item">
            <button className="btn btn-light ms-3" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
