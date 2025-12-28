import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./RoomMaster.css";

function RoomMaster() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    room_code: "",
    room_type: "CLASSROOM",
    floor: "",
    capacity: "",
    image: null,
    description: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get("/academics/rooms/");
    setRooms(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const createRoom = async () => {
    if (!form.room_code || !form.capacity) {
      alert("Room code & capacity required");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) data.append(key, form[key]);
    });

    try {
      setLoading(true);
      await api.post("/academics/rooms/create/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Room added");
      setForm({
        room_code: "",
        room_type: "CLASSROOM",
        floor: "",
        capacity: "",
        image: null,
        description: "",
      });
      fetchRooms();
    } catch (err) {
      alert("Error adding room");
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await api.delete(`/academics/rooms/delete/${id}/`);
    fetchRooms();
  };

  return (
    <div className="room-master">
      {/* LEFT PANEL */}
      <div className="room-form">
        <h2>🏗 Room Control Center</h2>

        <input
          name="room_code"
          placeholder="Room Code (L16, LAB-5)"
          value={form.room_code}
          onChange={handleChange}
        />

        <select name="room_type" onChange={handleChange}>
          <option value="CLASSROOM">Classroom</option>
          <option value="LAB">Lab</option>
          <option value="TUTORIAL">Tutorial</option>
          <option value="SEMINAR">Seminar Hall</option>
          <option value="COMMON">Common Room</option>
          <option value="AUDITORIUM">Auditorium</option>
        </select>

        <input
          name="floor"
          placeholder="Floor (optional)"
          value={form.floor}
          onChange={handleChange}
        />

        <input
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
        />

        <input type="file" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Short description"
          onChange={handleChange}
        />

        <button onClick={createRoom} disabled={loading}>
          {loading ? "Saving..." : "Add Room"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="room-grid">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            {room.image && (
              <img
                src={room.image}
                alt={room.room_code}
                className="room-img"
              />
            )}
            <h3>{room.room_code}</h3>
            <p>{room.room_type}</p>
            <p>👥 {room.capacity}</p>
            <span className="badge">ACTIVE</span>

            <button
              className="delete-btn"
              onClick={() => deleteRoom(room.id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomMaster;
