import React from "react";
import Navbar from "../components/Navbar";
function Home() {
  return (
    <>
    <Navbar />

    <div className="container mt-5">
      <h2 className="text-center">Welcome to College ERP System</h2>
      <p className="text-center mt-3">
        Manage students, teachers, attendance, marks and fees digitally.
      </p>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Student Management</h5>
            <p>Add, view and manage student records.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Teacher Management</h5>
            <p>Manage teachers and departments.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Attendance</h5>
            <p>Track student attendance daily.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
}

export default Home;
