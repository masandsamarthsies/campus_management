import React, { useEffect, useState } from "react";
import api from "../services/api";

function TimeSlotManagement() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const [classObj, setClassObj] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState("MON");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setClasses((await api.get("/academics/classes/")).data);
      setSubjects((await api.get("/academics/subjects/")).data);
      setTeachers((await api.get("/teachers/")).data);
      setRooms((await api.get("/academics/rooms/")).data);
      setTimetable((await api.get("/academics/timetable/")).data);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  // ================= CREATE TIMETABLE =================
  const createTimetable = async () => {
    // HARD VALIDATION
    if (!classObj) return alert("Select class");
    if (!subject) return alert("Select subject");
    if (!teacher) return alert("Select teacher");
    if (!room) return alert("Select room");
    if (!startTime || !endTime) return alert("Select time");

    try {
      await api.post("/academics/timetable/create-inline/", {
        class_obj: Number(classObj),
        subject: Number(subject),
        teacher: Number(teacher),
        room: Number(room),
        day: day,
        start_time: startTime,
        end_time: endTime,
      });

      alert("Timetable created successfully");

      // RESET FORM
      setClassObj("");
      setSubject("");
      setTeacher("");
      setRoom("");
      setDay("MON");
      setStartTime("");
      setEndTime("");

      loadAll();
    } catch (err) {
      alert(err.response?.data?.error || "Server error");
      console.error(err.response?.data);
    }
  };

  // ================= CANCEL CLASS =================
  const cancelClass = async (id) => {
    if (!window.confirm("Cancel this class?")) return;
    await api.post(`/academics/timetable/cancel/${id}/`);
    loadAll();
  };

  // ================= UI =================
  return (
    <div style={{ padding: "20px" }}>
      <h2>TimeSlot Management</h2>

      <h3>Create Timetable</h3>

      {/* CLASS */}
      <select value={classObj} onChange={(e) => setClassObj(e.target.value)}>
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.course} Sem {c.semester}-{c.division}
          </option>
        ))}
      </select>

      <br /><br />

      {/* SUBJECT */}
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <br /><br />

      {/* TEACHER */}
      <select value={teacher} onChange={(e) => setTeacher(e.target.value)}>
        <option value="">Select Teacher</option>
        {teachers.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <br /><br />

      {/* ROOM */}
      <select value={room} onChange={(e) => setRoom(e.target.value)}>
        <option value="">Select Room</option>
        {rooms.map((r) => (
          <option key={r.id} value={r.id}>{r.room_code}</option>
        ))}
      </select>

      <br /><br />

      {/* DAY */}
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="MON">Monday</option>
        <option value="TUE">Tuesday</option>
        <option value="WED">Wednesday</option>
        <option value="THU">Thursday</option>
        <option value="FRI">Friday</option>
        <option value="SAT">Saturday</option>
      </select>

      <br /><br />

      {/* TIME */}
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      &nbsp;
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

      <br /><br />

      <button onClick={createTimetable}>Assign Timetable</button>

      <hr />

      <h3>Existing Timetable</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Room</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((t) => (
            <tr key={t.id}>
              <td>{t.class}</td>
              <td>{t.subject}</td>
              <td>{t.teacher}</td>
              <td>{t.room}</td>
              <td>{t.timeslot}</td>
              <td>{t.is_cancelled ? "Cancelled" : "Active"}</td>
              <td>
                {!t.is_cancelled && (
                  <button onClick={() => cancelClass(t.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeSlotManagement;
