import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">ERP System</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* LOGIN DROPDOWN */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="loginDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Login
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/student-login">
                    Student Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/teacher-login">
                    Teacher Login
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
