import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PassengerForm = ({ flightId }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passport, setPassport] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [contactDetails, setContactDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [seatId, setSeatId] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [formError, setFormError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch email from session and load available seats
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);

    const selectedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
    if (selectedFlight) {
      setAmount(selectedFlight.amount || "");
      fetchAvailableSeats(selectedFlight.flightId);
      console.log("selectedFlight : " + selectedFlight.flightId);
    }
  }, []);

  // Fetch available seats for the flight
  const fetchAvailableSeats = async (flightId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/booking/available/${flightId}`
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableSeats(data);
      } else {
        console.error("Error fetching available seats");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Retrieve Passenger Info by Email
  const handleRetrieveInfo = async () => {
    setLoading(true);
    setApiError("");
    try {
      const response = await fetch(
        `http://localhost:8080/booking/getByEmail?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPassport(data.passport || "");
        setDateOfBirth(
          data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : ""
        );
        setGender(data.gender || "Male");
        setContactDetails(data.contactDetails || "");
      } else {
        setApiError("Passenger not found.");
      }
    } catch (error) {
      setApiError("Error retrieving passenger info.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!firstName || !lastName || !passport || !contactDetails || !seatId) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Redirect to the payment page
    navigate(
      `/payment?email=${email}&amount=${amount}&flightId=${flightId}&seatId=${seatId}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2>Passenger Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={handleRetrieveInfo} disabled={loading}>
            {loading ? "Loading..." : "Retrieve Info"}
          </button>
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Passport:</label>
          <input
            type="text"
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Details:</label>
          <input
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input type="number" value={amount} readOnly />
        </div>

        <div className="form-group">
          <label>Choose a Seat:</label>
          <select
            value={seatId}
            onChange={(e) => setSeatId(e.target.value)}
            required
          >
            <option value="">Select Seat</option>
            {availableSeats.map((seat) => (
              <option key={seat.seatId} value={seat.seatId}>
                {seat.seatNumber} ({seat.seatClass})
              </option>
            ))}
          </select>
        </div>

        {formError && <div className="error-message">{formError}</div>}
        {apiError && <div className="error-message">{apiError}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PassengerForm;
