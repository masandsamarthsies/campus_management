import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/academics/classes/");
      setClasses(res.data);
    } catch (error) {
      console.error(error);
      alert("Error loading classes");
    } finally {
      setLoading(false);
    }
  };

  // Separate classes by course
  const mcaClasses = classes.filter((c) => c.course === "MCA");
  const mmsClasses = classes.filter((c) => c.course === "MMS");

  const renderTable = (title, data) => (
    <div className="mt-4">
      <h4>{title}</h4>

      {data.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <table className="table table-bordered mt-2">
          <thead className="table-light">
            <tr>
              <th>Semester</th>
              <th>Division</th>
              <th>Academic Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cls) => (
              <tr key={cls.id}>
                <td>Semester {cls.semester}</td>
                <td>{cls.division}</td>
                <td>{cls.academic_year}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                     navigate(`/admin/classes/${cls.id}/manage`)

                    }
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="container mt-4">
      <h3>Manage Classes</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {renderTable("MCA Classes", mcaClasses)}
          {renderTable("MMS Classes", mmsClasses)}
        </>
      )}
    </div>
  );
}

export default ManageClasses;
