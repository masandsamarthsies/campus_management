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
                          Add class
                        </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/manage-classes" className="btn btn-primary mt-3">
                          Manage Classes
                        </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/rooms" className="btn btn-primary mt-3">
                          ADD CLASSROOMS
                        </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/rooms/view" className="btn btn-primary mt-3">
                          VIEW CLASSROOMS
                        </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/timeslots" className="btn btn-primary mt-3">
                          TIMESLOTS
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
