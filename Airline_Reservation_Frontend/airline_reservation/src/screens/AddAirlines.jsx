import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAirline.css";
import passenger from "../Components/images/passenger.png";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";

const AddAirlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [newAirline, setNewAirline] = useState({
    airlineId: "",
    airlineName: "",
    airlineCode: "",
    country: "",
    status: "ACTIVE",
  });
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/flight/getAllAirline")
      // .get("http://192.168.1.17:3000/flight/getAllAirline")
      .then((response) => setAirlines(response.data))
      .catch((error) => console.error("Error fetching airlines!", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAirline((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (
      !newAirline.airlineName.trim() ||
      !newAirline.airlineCode.trim() ||
      !newAirline.country.trim()
    ) {
      alert("Please fill all fields before adding a new airline.");
      return;
    }
    axios
      .post("http://localhost:8080/flight/addAirline", newAirline)
      // .post("http://192.168.1.17:3000/flight/addAirline", newAirline)
      .then((response) => {
        setAirlines([...airlines, response.data]);
        setNewAirline({
          airlineId: "",
          airlineName: "",
          airlineCode: "",
          country: "",
          status: "ACTIVE",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (id) => {
    setEditData((prev) => ({
      ...prev,
      [id]: airlines.find((airline) => airline.airlineId === id),
    }));
  };

  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:8080/flight/updateAirline/${id}`, editData[id])
      // .put(`http://192.168.1.17:3000/flight/updateAirline/${id}`, editData[id])
      .then(() => {
        setAirlines(
          airlines.map((airline) =>
            airline.airlineId === id ? editData[id] : airline
          )
        );
        setEditData((prev) => {
          const newEditData = { ...prev };
          delete newEditData[id];
          return newEditData;
        });
      })
      .catch((error) => console.error(error));
  };

  // ✅ Fixed: Corrected the string interpolation in the API request
  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/flight/airline/${id}/deactivate`
      );
      // const response = await axios.put(
      //   `http://192.168.1.17:3000/flight/airline/${id}/deactivate`
      // );

      if (response.status === 200) {
        // Update the airline status to INACTIVE in the frontend
        setAirlines((prevAirlines) =>
          prevAirlines.map((airline) =>
            airline.airlineId === id
              ? { ...airline, status: "INACTIVE" }
              : airline
          )
        );
        // alert("Airline marked as INACTIVE");
      } else {
        alert("Failed to update airline status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the airline status");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <div class="logo">
          <Link to="/UserList">
            <img
              src={passenger}
              style={{ width: "25px", marginRight: "5px" }}
            />
            Users
          </Link>
        </div>
        <AdminNavbar />
      </header>
      <h2>ADD AIRLINE</h2>
      <table border="2">
        <thead>
          <tr>
            <th>Airline Id</th>
            <th>Airline Name</th>
            <th>Airline Code</th>
            <th>Country</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airlines.map((airline) => (
            <tr key={airline.airlineId}>
              {editData[airline.airlineId] ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="airlineName"
                      value={editData[airline.airlineId].airlineName}
                      onChange={(e) => handleEditChange(e, airline.airlineId)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="airlineCode"
                      value={editData[airline.airlineId].airlineCode}
                      onChange={(e) => handleEditChange(e, airline.airlineId)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="country"
                      value={editData[airline.airlineId].country}
                      onChange={(e) => handleEditChange(e, airline.airlineId)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="status"
                      value={editData[airline.airlineId].status}
                      onChange={(e) => handleEditChange(e, airline.airlineId)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(airline.airlineId)}>
                      Save
                    </button>
                    <button
                      onClick={() =>
                        setEditData((prev) => {
                          const newEditData = { ...prev };
                          delete newEditData[airline.airlineId];
                          return newEditData;
                        })
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{airline.airlineId}</td>
                  <td>{airline.airlineName}</td>
                  <td>{airline.airlineCode}</td>
                  <td>{airline.country}</td>
                  <td>{airline.status}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(airline.airlineId)}
                      >
                        Edit
                      </button>
                      {airline.status === "ACTIVE" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(airline.airlineId)}
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-muted">Inactive</span>
                      )}
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>ADD NEW AIRLINE</h3>
      <input
        type="text"
        name="airlineName"
        value={newAirline.airlineName}
        onChange={handleChange}
        placeholder="Airline Name"
      />
      <input
        type="text"
        name="airlineCode"
        value={newAirline.airlineCode}
        onChange={handleChange}
        placeholder="Airline Code"
      />
      <input
        type="text"
        name="country"
        value={newAirline.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <button onClick={handleAdd}>Add Airline</button>
    </div>
  );
};

export default AddAirlines;
