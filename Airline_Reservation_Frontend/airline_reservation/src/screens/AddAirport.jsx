import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import passenger from "../Components/images/passenger.png";
import { Link } from "react-router-dom";

const AddAirport = () => {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    airportName: "",
    airportCode: "",
    location: "",
    country: "",
  });
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all airports from the backend
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/flight/getAllAirport")
      .then((response) => {
        setAirports(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching airports!");
        setLoading(false);
      });
  }, []);

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAirport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new airport
  const handleAdd = () => {
    if (
      !newAirport.airportName.trim() ||
      !newAirport.airportCode.trim() ||
      !newAirport.location.trim() ||
      !newAirport.country.trim()
    ) {
      alert("Please fill all fields before adding a new airport.");
      return;
    }

    axios
      .post("http://localhost:8080/flight/addAirport", newAirport)
      .then((response) => {
        setAirports([...airports, response.data]);
        setNewAirport({
          airportName: "",
          airportCode: "",
          location: "",
          country: "",
        });
      })
      .catch((error) => {
        console.error("Error adding airport", error);
        setError("Error adding airport");
      });
  };

  // Edit an airport (populate edit form)
  const handleEdit = (id) => {
    setEditData((prev) => ({
      ...prev,
      [id]: airports.find((airport) => airport.airportId === id),
    }));
  };

  // Handle changes in the edit form input fields
  const handleEditChange = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  // Save changes after editing
  const handleSave = (id) => {
    axios
      .put(`http://localhost:8080/flight/updateAirport/${id}`, editData[id])
      .then(() => {
        setAirports(
          airports.map((airport) =>
            airport.airportId === id ? editData[id] : airport
          )
        );
        setEditData((prev) => {
          const newEditData = { ...prev };
          delete newEditData[id];
          return newEditData;
        });
      })
      .catch((error) => {
        console.error("Error updating airport", error);
        setError("Error updating airport");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <AdminNavbar />
      </header>
      <h2>Airports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {/* List of Airports */}
          <table border="2">
            <thead>
              <tr>
                <th>Airport Id</th>
                <th>Airport Name</th>
                <th>Airport Code</th>
                <th>Location</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {airports.map((airport) => (
                <tr key={airport.airportId}>
                  {editData[airport.airportId] ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="airportName"
                          value={editData[airport.airportId].airportName}
                          onChange={(e) =>
                            handleEditChange(e, airport.airportId)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="airportCode"
                          value={editData[airport.airportId].airportCode}
                          onChange={(e) =>
                            handleEditChange(e, airport.airportId)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="location"
                          value={editData[airport.airportId].location}
                          onChange={(e) =>
                            handleEditChange(e, airport.airportId)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="country"
                          value={editData[airport.airportId].country}
                          onChange={(e) =>
                            handleEditChange(e, airport.airportId)
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => handleSave(airport.airportId)}>
                          Save
                        </button>
                        <button
                          onClick={() =>
                            setEditData((prev) => {
                              const newEditData = { ...prev };
                              delete newEditData[airport.airportId];
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
                      <td>{airport.airportId}</td>
                      <td>{airport.airportName}</td>
                      <td>{airport.airportCode}</td>
                      <td>{airport.location}</td>
                      <td>{airport.country}</td>
                      <td>
                        <button onClick={() => handleEdit(airport.airportId)}>
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Form to Add New Airport */}
          <h3>Add New Airport</h3>
          <input
            type="text"
            name="airportName"
            value={newAirport.airportName}
            onChange={handleChange}
            placeholder="Airport Name"
          />
          <input
            type="text"
            name="airportCode"
            value={newAirport.airportCode}
            onChange={handleChange}
            placeholder="Airport Code"
          />
          <input
            type="text"
            name="location"
            value={newAirport.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="text"
            name="country"
            value={newAirport.country}
            onChange={handleChange}
            placeholder="Country"
          />
          <button onClick={handleAdd}>Add Airport</button>
        </>
      )}
    </div>
  );
};

export default AddAirport;
