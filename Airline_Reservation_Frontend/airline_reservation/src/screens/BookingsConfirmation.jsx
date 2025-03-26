import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
import passenger from "../Components/images/passenger.png";
import { Link } from "react-router-dom";

const BookedSeatsTable = () => {
  // State to store flightId entered by the user
  const [flightId, setFlightId] = useState("");
  // State to store booked seats data
  const [bookedSeats, setBookedSeats] = useState([]);
  // State to handle errors
  const [error, setError] = useState("");

  // Fetch booked seats by flightId
  const fetchBookedSeats = async () => {
    if (!flightId) {
      setError("❌ Please enter a valid Flight ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/booking/bookedSeats/${flightId}`
      );
      if (response.data.length === 0) {
        setError("⚠️ No booked seats found for this flight.");
        setBookedSeats([]);
      } else {
        setBookedSeats(response.data);
        setError("");
      }
    } catch (err) {
      setError(
        "❌ Error fetching booked seats. Flight not found or server error."
      );
      setBookedSeats([]);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <header>
          <AdminNavbar />
        </header>
        <h2 className="text-2xl font-bold mb-4">
          Get Booked Seats by Flight ID
        </h2>

        {/* Input to enter flightId */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter Flight ID"
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            className="p-2 border rounded w-1/3"
          />
          <button
            onClick={fetchBookedSeats}
            className="ml-2 bg-blue-500 text-white p-2 rounded"
          >
            Get Booked Seats
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Table to display booked seats */}
        {bookedSeats.length > 0 && (
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">Seat ID</th>
                <th className="border p-2">Flight ID</th>
                <th className="border p-2">Seat Number</th>
                <th className="border p-2">Seat Class</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Aircraft</th>
                <th className="border p-2">Passenger Name</th>
              </tr>
            </thead>
            <tbody>
              {bookedSeats.map((seat) => (
                <tr key={seat.seatId} className="text-center">
                  <td className="border p-2">{seat.seatId}</td>
                  <td className="border p-2">{seat.flightId}</td>
                  <td className="border p-2">{seat.seatNumber}</td>
                  <td className="border p-2">{seat.seatClass}</td>
                  <td className="border p-2">{seat.status}</td>
                  <td className="border p-2">{seat.source}</td>
                  <td className="border p-2">{seat.destination}</td>
                  <td className="border p-2">{seat.aircraft}</td>
                  <td className="border p-2">{seat.passengerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookedSeatsTable;
