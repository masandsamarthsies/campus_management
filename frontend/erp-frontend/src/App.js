import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import AdminClassManagement from "./pages/AdminClassManagement";
import ManageClasses from "./pages/ManageClasses";
import ClassManagePage from "./pages/ClassManagePage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/admin/class-management" element={<AdminClassManagement />} />
        <Route path="/admin/manage-classes" element={<ManageClasses />} />
        <Route path="/admin/classes/:classId/manage" element={<ClassManagePage />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
