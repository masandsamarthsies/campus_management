import React from "react";
import StudentNavbar from "../components/StudentNavbar";

function StudentHome() {
  return (
   <>
    <StudentNavbar />
    <div className="container mt-5">
      <h2>Welcome Student 🎓</h2>
      <p>You have successfully logged in.</p>
    </div>
    </> 
  );
}


export default StudentHome;
