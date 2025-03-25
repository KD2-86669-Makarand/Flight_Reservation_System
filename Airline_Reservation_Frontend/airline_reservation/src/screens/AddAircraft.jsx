import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import passenger from "../Components/images/passenger.png";
import { Link } from "react-router-dom";

const AddAircraft = () => {
  const [aircraft, setAircraft] = useState([]);
  const [airlinesList, setAirlinesList] = useState([]);
  const [editAircraftId, setEditAircraftId] = useState(null);
  const [editAircraftData, setEditAircraftData] = useState({});
  const [newAircraft, setNewAircraft] = useState({
    aircraftModel: "",
    aircraftCapacity: "",
    airline: "",
  });

  useEffect(() => {
    fetchAircraft();
    fetchAirlines();
  }, []);

  const fetchAircraft = () => {
    axios
      .get("http://localhost:8080/flight/getAllAircraft")
      .then((response) => {
        console.log("Aircraft data:", response.data);
        setAircraft(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Error fetching aircraft:", error));
  };

  const fetchAirlines = () => {
    axios
      .get("http://localhost:8080/flight/getAllAirline")
      .then((response) => setAirlinesList(response.data))
      .catch((error) => console.error("Error fetching airlines:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAircraft((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    setEditAircraftId(id);
    const aircraftToEdit = aircraft.find((item) => item.aircraftId === id);
    setEditAircraftData({ ...aircraftToEdit });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAircraftData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `http://localhost:8080/flight/updateAircraft/${editAircraftId}`,
        editAircraftData
      )
      .then(() => {
        fetchAircraft();
        setEditAircraftId(null);
      })
      .catch((error) => console.error("Error updating aircraft:", error));
  };

  const handleCancelEdit = () => {
    setEditAircraftId(null);
  };

  const handleAdd = () => {
    console.log("Submitting Aircraft Data:", newAircraft);
    axios
      .post("http://localhost:8080/flight/addAircraft", newAircraft)
      .then(() => {
        fetchAircraft();
        setNewAircraft({
          aircraftModel: "",
          aircraftCapacity: "",
          airline: "",
        });
      })
      .catch((error) => console.error("Error adding aircraft:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/flight/softDeleteAircraft/${id}`)
      .then(() => fetchAircraft())
      .catch((error) => console.error("Error deleting aircraft:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <header>
        <div className="logo">
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
      <h2>ADD AIRCRAFT</h2>
      <table border="2">
        <thead>
          <tr>
            <th>Aircraft Id</th>
            <th>Aircraft Model</th>
            <th>Aircraft Capacity</th>
            <th>Airline Id</th>
            <th>Airline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(aircraft) && aircraft.length > 0 ? (
            aircraft.map((item) => (
              <tr key={item.aircraftId}>
                {editAircraftId === item.aircraftId ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="aircraftModel"
                        value={editAircraftData.aircraftModel}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="aircraftCapacity"
                        value={editAircraftData.aircraftCapacity}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>{item.airlineName}</td>
                    <td>
                      <button
                        onClick={handleSaveEdit}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.aircraftId}</td>
                    <td>{item.aircraftModel}</td>
                    <td>{item.aircraftCapacity}</td>
                    <td>{item.airlineId}</td>
                    <td>{item.airlineName}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(item.aircraftId)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.aircraftId)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No aircraft data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Add New Aircraft</h3>
      <div>
        <input
          type="text"
          name="aircraftModel"
          value={newAircraft.aircraftModel}
          onChange={handleChange}
          placeholder="Aircraft Model"
        />
        <input
          type="number"
          name="aircraftCapacity"
          value={newAircraft.aircraftCapacity}
          onChange={handleChange}
          placeholder="Aircraft Capacity"
        />
        <select
          name="airline"
          value={newAircraft.airline}
          onChange={handleChange}
        >
          <option value="">Select Airline</option>
          {airlinesList.map((airline) => (
            <option key={airline.airlineId} value={airline.airlineId}>
              {airline.airlineName}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add Aircraft</button>
      </div>
    </div>
  );
};

export default AddAircraft;
