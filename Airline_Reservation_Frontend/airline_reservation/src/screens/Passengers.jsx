import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";

const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/flight/getAllPassengers"
      );
      setPassengers(response.data);
    } catch (error) {
      console.error("Error fetching passengers!", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header>
        <AdminNavbar />
      </header>
      <h2 className="text-center mb-4">Passenger List</h2>
      <table border="2">
        <thead>
          <tr>
            <th>Passenger ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Passport</th>
          </tr>
        </thead>
        <tbody>
          {passengers.length > 0 ? (
            passengers.map((passenger) => (
              <tr key={passenger.passengerId}>
                <td>{passenger.passengerId}</td>
                <td>{passenger.firstName}</td>
                <td>{passenger.lastName}</td>
                <td>{passenger.email}</td>
                <td>{passenger.dateOfBirth}</td>
                <td>{passenger.gender ? passenger.gender : "N/A"}</td>
                <td>
                  {passenger.contactDetails ? passenger.contactDetails : "N/A"}
                </td>
                <td>{passenger.passport ? passenger.passport : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No passengers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PassengerList;
