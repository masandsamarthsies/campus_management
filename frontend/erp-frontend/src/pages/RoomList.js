import React, { useEffect, useState } from "react";
import api from "../services/api";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/academics/rooms/");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms", err);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await api.delete(`/academics/rooms/delete/${id}/`);
      fetchRooms();
    } catch (err) {
      alert("Error deleting room");
    }
  };

  // Group rooms floor-wise
  const groupedRooms = rooms.reduce((acc, room) => {
    const floor = room.floor !== null ? `Floor ${room.floor}` : "No Floor";
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(room);
    return acc;
  }, {});

  return (
    <div>
      <h2>Room List (Floor Wise)</h2>

      {Object.keys(groupedRooms).length === 0 && (
        <p>No rooms found.</p>
      )}

      {Object.keys(groupedRooms).map((floor) => (
        <div key={floor}>
          <h3>{floor}</h3>

          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Room Code</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {groupedRooms[floor].map((room) => (
                <tr key={room.id}>
                  <td>{room.room_code}</td>
                  <td>{room.room_type}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <button onClick={() => deleteRoom(room.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
        </div>
      ))}
    </div>
  );
}

export default RoomList;
