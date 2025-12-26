import React from "react";
import TeacherNavbar from "../components/TeacherNavbar";
function TeacherHome() {
  return (
    <>
    <TeacherNavbar/>
    <div className="container mt-5">
      <h2>Welcome Teacher 👩‍🏫👨‍🏫</h2>
      <p>You are logged in successfully.</p>
    </div>
    </>
  );
}

export default TeacherHome;
