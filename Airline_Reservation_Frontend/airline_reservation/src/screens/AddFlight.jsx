import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
// import "./AddFlight.css";
import passenger from "../Components/images/passenger.png";
import { Link } from "react-router-dom";

const FlightAdd = () => {
  const [airlines, setAirlines] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);

  const [newFlight, setNewFlight] = useState({
    airlineId: "",
    aircraftId: "",
    sourceId: "",
    destinationId: "",
    distance: "",
    departureTime: "",
    arrivalTime: "",
    isDirect: "true",
    price: "",
  });

  // ✅ Fetch Airlines, Aircrafts, and Airports
  useEffect(() => {
    axios
      .get("http://localhost:8080/flight/getAllAirline")
      .then((response) => setAirlines(response.data))
      .catch((error) => console.error("Error fetching airlines!", error));

    axios
      .get("http://localhost:8080/flight/getAllAircraft")
      .then((response) => setAircrafts(response.data))
      .catch((error) => console.error("Error fetching aircrafts!", error));

    axios
      .get("http://localhost:8080/flight/getAllAirport")
      .then((response) => setAirports(response.data))
      .catch((error) => console.error("Error fetching airports!", error));

    fetchFlights();
  }, []);

  // ✅ Fetch All Flights
  const fetchFlights = () => {
    axios
      .get("http://localhost:8080/flight/getAllFlights")
      .then((response) => setFlights(response.data))
      .catch((error) => console.error("Error fetching flights!", error));
  };

  // ✅ Filter Aircrafts Based on Selected Airline
  useEffect(() => {
    if (newFlight.airlineId) {
      const filtered = aircrafts.filter(
        (aircraft) => aircraft.airlineId === Number(newFlight.airlineId)
      );
      setFilteredAircrafts(filtered);
    } else {
      setFilteredAircrafts([]);
    }
  }, [newFlight.airlineId, aircrafts]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFlight((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✅ Convert DateTime to "dd-MM-yyyy HH:mm" Format
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // ✅ Handle Flight Submission
  const handleAdd = () => {
    if (
      !newFlight.airlineId ||
      !newFlight.aircraftId ||
      !newFlight.sourceId ||
      !newFlight.destinationId ||
      !newFlight.distance ||
      !newFlight.departureTime ||
      !newFlight.arrivalTime ||
      !newFlight.price
    ) {
      alert("Please fill all fields before adding a new flight.");
      return;
    }

    const formattedFlight = {
      ...newFlight,
      distance: parseFloat(newFlight.distance),
      price: parseFloat(newFlight.price),
      isDirect: true,
      departureTime: formatDateTime(newFlight.departureTime),
      arrivalTime: formatDateTime(newFlight.arrivalTime),
    };

    axios
      .post("http://localhost:8080/flight/addFlight", formattedFlight)
      .then(() => {
        alert("Flight added successfully!");
        fetchFlights();
        setNewFlight({
          airlineId: "",
          aircraftId: "",
          sourceId: "",
          destinationId: "",
          distance: "",
          departureTime: "",
          arrivalTime: "",
          isDirect: "true",
          price: "",
        });
      })
      .catch((error) => console.error("Error adding flight!", error));
  };

  return (
    <div>
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

        {/* ✅ Flight List Table */}
        <h2>Existing Flights</h2>
        <table
          border="2"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px", // ✅ Smaller font
            textAlign: "center",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f2f2f2",
              fontSize: "12px",
              fontStyle: "italic",
            }}
          >
            <tr>
              <th>Flight ID</th>
              <th>Airline</th>
              <th>Aircraft</th>
              <th>Total Seats</th>
              <th>Available seats</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: "",
              fontSize: "12px",
              fontStyle: "italic",
            }}
          >
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight.flightId}>
                  <td>{flight.flightId}</td>
                  <td>{flight.airlineName}</td>
                  <td>{flight.aircraftModel}</td>
                  <td>{flight.totalSeats}</td>
                  <td>{flight.availableSeats}</td>{" "}
                  <td>{flight.sourceAirportName}</td>
                  <td>{flight.destinationAirportName}</td>
                  <td>{flight.departureTime}</td>
                  <td>{flight.arrivalTime}</td>
                  <td>{flight.distance} km</td>
                  <td>{flight.duration}</td>
                  <td>₹{flight.price}</td>
                  <td>{flight.direct ? "Direct" : "Connected"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No flights available</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Add New Flight</h2>

        <select
          name="airlineId"
          value={newFlight.airlineId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Airline
          </option>
          {airlines.map((airline) => (
            <option key={airline.airlineId} value={airline.airlineId}>
              {airline.airlineName}
            </option>
          ))}
        </select>

        <select
          name="aircraftId"
          value={newFlight.aircraftId}
          onChange={handleChange}
          disabled={!newFlight.airlineId}
        >
          <option value="" disabled>
            Select Aircraft
          </option>
          {filteredAircrafts.map((aircraft) => (
            <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
              {aircraft.aircraftModel}
            </option>
          ))}
        </select>

        <select
          name="sourceId"
          value={newFlight.sourceId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Source Airport
          </option>
          {airports.map((airport) => (
            <option key={airport.airportId} value={airport.airportId}>
              {airport.airportName}
            </option>
          ))}
        </select>

        <select
          name="destinationId"
          value={newFlight.destinationId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Destination Airport
          </option>
          {airports.map((airport) => (
            <option key={airport.airportId} value={airport.airportId}>
              {airport.airportName}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="distance"
          value={newFlight.distance}
          onChange={handleChange}
          placeholder="Distance (km)"
        />
        <input
          type="number"
          name="price"
          value={newFlight.price}
          onChange={handleChange}
          placeholder="Price (₹)"
        />
        <input
          type="datetime-local"
          name="departureTime"
          value={newFlight.departureTime}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="arrivalTime"
          value={newFlight.arrivalTime}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Flight</button>
      </div>
    </div>
  );
};

export default FlightAdd;
