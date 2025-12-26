import React from "react";
import { Link, useNavigate } from "react-router-dom";

function TeacherNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/teacher-login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/teacher-home">
          Teacher Panel
        </Link>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/teacher-home">Home</Link>
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

export default TeacherNavbar;
