// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// // import "./BookingSeats.css"; // Optional CSS for styling

// const BookingSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [flightDetails, setFlightDetails] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // ✅ Fetch Flight Details
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getFlightDetails?flightId=${flightId}`
//         )
//         .then((response) => {
//           setFlightDetails(response.data);
//           fetchAvailableSeats(flightId);
//         })
//         .catch((error) =>
//           console.error("Error fetching flight details!", error)
//         );
//     }
//   }, [flightId]);

//   // ✅ Fetch Available Seats for the Flight
//   const fetchAvailableSeats = (flightId) => {
//     axios
//       .get(
//         `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//       )
//       .then((response) => setAvailableSeats(response.data))
//       .catch((error) =>
//         console.error("Error fetching available seats!", error)
//       );
//   };

//   // ✅ Handle Seat Selection
//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats(
//       (prevSeats) =>
//         prevSeats.includes(seatNumber)
//           ? prevSeats.filter((seat) => seat !== seatNumber) // Deselect if already selected
//           : [...prevSeats, seatNumber] // Add new selection
//     );
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = () => {
//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat!");
//       return;
//     }

//     axios
//       .post("http://localhost:8080/flight/bookSeats", {
//         flightId,
//         seatNumbers: selectedSeats,
//       })
//       .then((response) => {
//         alert("Booking successful!");
//         navigate("/bookingConfirmation"); // Redirect to booking confirmation page
//       })
//       .catch((error) => console.error("Error booking seats!", error));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Book Your Seats</h2>

//       {flightDetails && (
//         <div className="flight-info">
//           <h5>{flightDetails.airlineName}</h5>
//           <p>
//             {flightDetails.sourceAirportName} ✈{" "}
//             {flightDetails.destinationAirportName}
//           </p>
//           <p>Departure: {flightDetails.departureTime}</p>
//           <p>Arrival: {flightDetails.arrivalTime}</p>
//           <p>Available Seats: {availableSeats.length}</p>
//         </div>
//       )}

//       <h4>Select Your Seat(s):</h4>
//       <div className="seats-grid">
//         {availableSeats.length > 0 ? (
//           availableSeats.map((seat) => (
//             <button
//               key={seat.seatNumber}
//               className={`seat-btn ${
//                 selectedSeats.includes(seat.seatNumber) ? "selected" : ""
//               }`}
//               onClick={() => toggleSeatSelection(seat.seatNumber)}
//             >
//               {seat.seatNumber}
//             </button>
//           ))
//         ) : (
//           <p>No available seats for this flight.</p>
//         )}
//       </div>

//       <div className="text-center">
//         <button className="btn btn-success mt-3" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSeats;
///////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BookingSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [flightDetails, setFlightDetails] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dateOfBirth: "",
//     gender: "",
//     contactDetails: "",
//     passport: "",
//   });

//   // ✅ Fetch Logged-in Passenger Details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/booking/getLoggedInPassenger")
//       .then((response) => setPassengerDetails(response.data))
//       .catch((error) =>
//         console.error("Error fetching passenger details!", error)
//       );
//   }, []);

//   // ✅ Fetch Flight & Seats
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getFlightDetails?flightId=${flightId}`
//         )
//         .then((response) => {
//           setFlightDetails(response.data);
//           fetchAvailableSeats(flightId);
//         })
//         .catch((error) =>
//           console.error("Error fetching flight details!", error)
//         );
//     }
//   }, [flightId]);

//   const fetchAvailableSeats = (flightId) => {
//     axios
//       .get(
//         `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//       )
//       .then((response) => setAvailableSeats(response.data))
//       .catch((error) =>
//         console.error("Error fetching available seats!", error)
//       );
//   };

//   // ✅ Handle Seat Selection
//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seatNumber)
//         ? prevSeats.filter((seat) => seat !== seatNumber)
//         : [...prevSeats, seatNumber]
//     );
//   };

//   // ✅ Handle Passenger Info Change
//   const handlePassengerInfoChange = (e) => {
//     const { name, value } = e.target;
//     setPassengerDetails({ ...passengerDetails, [name]: value });
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = () => {
//     if (!passengerDetails.contactDetails || !passengerDetails.passport) {
//       alert("Please provide your contact number and passport number.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat!");
//       return;
//     }

//     const bookingData = {
//       flightId,
//       seatNumbers: selectedSeats,
//       passengerId: passengerDetails.passengerId,
//       contactDetails: passengerDetails.contactDetails,
//       passport: passengerDetails.passport,
//     };

//     axios
//       .post("http://localhost:8080/flight/bookSeats", bookingData)
//       .then(() => {
//         alert("Booking successful!");
//         navigate("/bookingConfirmation");
//       })
//       .catch((error) => console.error("Error booking seats!", error));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Book Your Seats</h2>

//       {flightDetails && (
//         <div className="flight-info">
//           <h5>{flightDetails.airlineName}</h5>
//           <p>
//             {flightDetails.sourceAirportName} ✈{" "}
//             {flightDetails.destinationAirportName}
//           </p>
//           <p>Departure: {flightDetails.departureTime}</p>
//           <p>Arrival: {flightDetails.arrivalTime}</p>
//           <p>Available Seats: {availableSeats.length}</p>
//         </div>
//       )}

//       {/* ✅ Passenger Info Form */}
//       <h4>Passenger Information</h4>
//       <form>
//         <div className="mb-3">
//           <label className="form-label">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="firstName"
//             value={passengerDetails.firstName}
//             disabled
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="lastName"
//             value={passengerDetails.lastName}
//             disabled
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={passengerDetails.email}
//             disabled
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Date of Birth</label>
//           <input
//             type="date"
//             className="form-control"
//             name="dateOfBirth"
//             value={passengerDetails.dateOfBirth}
//             disabled
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Gender</label>
//           <select className="form-select" name="gender" disabled>
//             <option value="">
//               {passengerDetails.gender || "Not Specified"}
//             </option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Contact Number</label>
//           <input
//             type="text"
//             className="form-control"
//             name="contactDetails"
//             value={passengerDetails.contactDetails}
//             onChange={handlePassengerInfoChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Passport Number</label>
//           <input
//             type="text"
//             className="form-control"
//             name="passport"
//             value={passengerDetails.passport}
//             onChange={handlePassengerInfoChange}
//             required
//           />
//         </div>
//       </form>

//       {/* ✅ Seat Selection */}
//       <h4>Select Your Seat(s):</h4>
//       <div className="seats-grid">
//         {availableSeats.length > 0 ? (
//           availableSeats.map((seat) => (
//             <button
//               key={seat.seatNumber}
//               className={`seat-btn ${
//                 selectedSeats.includes(seat.seatNumber) ? "selected" : ""
//               }`}
//               onClick={() => toggleSeatSelection(seat.seatNumber)}
//             >
//               {seat.seatNumber}
//             </button>
//           ))
//         ) : (
//           <p>No available seats for this flight.</p>
//         )}
//       </div>

//       <div className="text-center">
//         <button className="btn btn-success mt-3" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSeats;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [flightDetails, setFlightDetails] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dateOfBirth: "",
//     gender: "",
//     contactDetails: "",
//     passport: "",
//   });

//   // ✅ Fetch Logged-in Passenger Details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/booking/getLoggedInPassenger", {
//         withCredentials: true, // 🔥 Ensures session is sent
//       })
//       .then((response) => setPassengerDetails(response.data))
//       .catch((error) => toast.error("Error fetching passenger details!"));
//   }, []);

//   // ✅ Fetch Flight & Seats
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getFlightDetails?flightId=${flightId}`
//         )
//         .then((response) => {
//           setFlightDetails(response.data);
//           fetchAvailableSeats(flightId);
//         })
//         .catch(() => toast.error("Error fetching flight details!"));
//     }
//   }, [flightId]);

//   const fetchAvailableSeats = (flightId) => {
//     axios
//       .get(
//         `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//       )
//       .then((response) => setAvailableSeats(response.data))
//       .catch(() => toast.error("Error fetching available seats!"));
//   };

//   // ✅ Handle Seat Selection
//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seatNumber)
//         ? prevSeats.filter((seat) => seat !== seatNumber)
//         : [...prevSeats, seatNumber]
//     );
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = () => {
//     if (!passengerDetails.contactDetails || !passengerDetails.passport) {
//       toast.error("Please enter your contact number and passport.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       toast.error("Please select at least one seat!");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:8080/flight/bookSeats",
//         {
//           flightId,
//           seatNumbers: selectedSeats,
//           passengerId: passengerDetails.passengerId,
//           contactDetails: passengerDetails.contactDetails,
//           passport: passengerDetails.passport,
//         },
//         { withCredentials: true }
//       )
//       .then(() => {
//         toast.success("Booking successful!");
//         navigate("/bookingConfirmation");
//       })
//       .catch(() => toast.error("Error booking seats!"));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Book Your Seats</h2>

//       {flightDetails && (
//         <div className="flight-info">
//           <h5>{flightDetails.airlineName}</h5>
//           <p>
//             {flightDetails.sourceAirportName} ✈{" "}
//             {flightDetails.destinationAirportName}
//           </p>
//           <p>Departure: {flightDetails.departureTime}</p>
//           <p>Arrival: {flightDetails.arrivalTime}</p>
//           <p>Available Seats: {availableSeats.length}</p>
//         </div>
//       )}

//       <h4>Select Your Seat(s):</h4>
//       <div className="seats-grid">
//         {availableSeats.length > 0 ? (
//           availableSeats.map((seat) => (
//             <button
//               key={seat.seatNumber}
//               className={`seat-btn ${
//                 selectedSeats.includes(seat.seatNumber) ? "selected" : ""
//               }`}
//               onClick={() => toggleSeatSelection(seat.seatNumber)}
//             >
//               {seat.seatNumber}
//             </button>
//           ))
//         ) : (
//           <p>No available seats for this flight.</p>
//         )}
//       </div>

//       <button className="btn btn-success mt-3" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default BookingSeats;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [flightDetails, setFlightDetails] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dateOfBirth: "",
//     gender: "",
//     contactDetails: "",
//     passport: "",
//   });

//   // ✅ Fetch Logged-in Passenger Details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/booking/getLoggedInPassenger", {
//         withCredentials: true, // Ensures session authentication
//       })
//       .then((response) => setPassengerDetails(response.data))
//       .catch(() => toast.error("Error fetching passenger details!"));
//   }, []);

//   // ✅ Fetch Flight & Available Seats
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getFlightDetails?flightId=${flightId}`
//         )
//         .then((response) => {
//           setFlightDetails(response.data);
//           fetchAvailableSeats(flightId);
//         })
//         .catch(() => toast.error("Error fetching flight details!"));
//     }
//   }, [flightId]);

//   // ✅ Fetch Available Seats
//   const fetchAvailableSeats = (flightId) => {
//     axios
//       .get(
//         `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//       )
//       .then((response) => setAvailableSeats(response.data))
//       .catch(() => toast.error("Error fetching available seats!"));
//   };

//   // ✅ Handle Seat Selection
//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seatNumber)
//         ? prevSeats.filter((seat) => seat !== seatNumber)
//         : [...prevSeats, seatNumber]
//     );

//     // Refresh available seats dynamically
//     fetchAvailableSeats(flightId);
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = () => {
//     if (!passengerDetails.contactDetails || !passengerDetails.passport) {
//       toast.error("Please enter your contact number and passport.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       toast.error("Please select at least one seat!");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:8080/flight/bookSeats",
//         {
//           flightId,
//           seatNumbers: selectedSeats,
//           passengerId: passengerDetails.passengerId,
//           contactDetails: passengerDetails.contactDetails,
//           passport: passengerDetails.passport,
//         },
//         { withCredentials: true }
//       )
//       .then(() => {
//         toast.success("Booking successful!");
//         navigate("/bookingConfirmation");
//       })
//       .catch(() => toast.error("Error booking seats!"));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Book Your Seats</h2>

//       {flightDetails && (
//         <div className="flight-info">
//           <h5>{flightDetails.airlineName}</h5>
//           <p>
//             {flightDetails.sourceAirportName} ✈{" "}
//             {flightDetails.destinationAirportName}
//           </p>
//           <p>Departure: {flightDetails.departureTime}</p>
//           <p>Arrival: {flightDetails.arrivalTime}</p>
//           <p>Available Seats: {availableSeats.length}</p>
//         </div>
//       )}

//       <h4>Select Your Seat(s):</h4>
//       <div className="seats-grid">
//         {availableSeats.length > 0 ? (
//           availableSeats.map((seat) => (
//             <button
//               key={seat.seatNumber}
//               className={`seat-btn ${
//                 selectedSeats.includes(seat.seatNumber) ? "selected" : ""
//               }`}
//               onClick={() => toggleSeatSelection(seat.seatNumber)}
//             >
//               {seat.seatNumber}
//             </button>
//           ))
//         ) : (
//           <p>No available seats for this flight.</p>
//         )}
//       </div>

//       <button className="btn btn-success mt-3" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default BookingSeats;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [flightDetails, setFlightDetails] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dateOfBirth: "",
//     gender: "",
//     contactDetails: "",
//     passport: "",
//   });

//   // ✅ Fetch Logged-in Passenger Details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/booking/getLoggedInPassenger", {
//         withCredentials: true, // 🔥 Ensures session authentication
//       })
//       .then((response) => setPassengerDetails(response.data))
//       .catch(() => toast.error("Error fetching passenger details!"));
//   }, []);

//   // ✅ Fetch Flight & Available Seats
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getFlightDetails?flightId=${flightId}`
//         )
//         .then((response) => {
//           setFlightDetails(response.data);
//           fetchAvailableSeats(flightId);
//         })
//         .catch(() => toast.error("Error fetching flight details!"));
//     }
//   }, [flightId]);

//   // ✅ Fetch Available Seats
//   const fetchAvailableSeats = (flightId) => {
//     axios
//       .get(
//         `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//       )
//       .then((response) => setAvailableSeats(response.data))
//       .catch(() => toast.error("Error fetching available seats!"));
//   };

//   // ✅ Handle Seat Selection
//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats((prevSeats) =>
//       prevSeats.includes(seatNumber)
//         ? prevSeats.filter((seat) => seat !== seatNumber)
//         : [...prevSeats, seatNumber]
//     );
//   };

//   // ✅ Handle Passenger Info Update
//   const handlePassengerChange = (e) => {
//     const { name, value } = e.target;
//     setPassengerDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // ✅ Confirm Booking
//   const handleConfirmBooking = () => {
//     if (!passengerDetails.contactDetails || !passengerDetails.passport) {
//       toast.error("Please enter your contact number and passport.");
//       return;
//     }
//     if (selectedSeats.length === 0) {
//       toast.error("Please select at least one seat!");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:8080/flight/bookSeats",
//         {
//           flightId,
//           seatNumbers: selectedSeats,
//           passengerId: passengerDetails.passengerId,
//           contactDetails: passengerDetails.contactDetails,
//           passport: passengerDetails.passport,
//         },
//         { withCredentials: true }
//       )
//       .then(() => {
//         toast.success("Booking successful!");
//         navigate("/bookingConfirmation");
//       })
//       .catch(() => toast.error("Error booking seats!"));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Book Your Seats</h2>

//       {flightDetails && (
//         <div className="flight-info">
//           <h5>{flightDetails.airlineName}</h5>
//           <p>
//             {flightDetails.sourceAirportName} ✈{" "}
//             {flightDetails.destinationAirportName}
//           </p>
//           <p>Departure: {flightDetails.departureTime}</p>
//           <p>Arrival: {flightDetails.arrivalTime}</p>
//           <p>Available Seats: {availableSeats.length}</p>
//         </div>
//       )}

//       <h4>Select Your Seat(s):</h4>
//       <div className="seats-grid">
//         {availableSeats.length > 0 ? (
//           availableSeats.map((seat) => (
//             <button
//               key={seat.seatNumber}
//               className={`seat-btn ${
//                 selectedSeats.includes(seat.seatNumber) ? "selected" : ""
//               }`}
//               onClick={() => toggleSeatSelection(seat.seatNumber)}
//             >
//               {seat.seatNumber}
//             </button>
//           ))
//         ) : (
//           <p>No available seats for this flight.</p>
//         )}
//       </div>

//       {/* ✅ Passenger Details Form */}
//       <h4 className="mt-4">Passenger Information</h4>
//       <div className="passenger-form">
//         <input
//           type="text"
//           name="firstName"
//           value={passengerDetails.firstName}
//           readOnly
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           name="lastName"
//           value={passengerDetails.lastName}
//           readOnly
//           placeholder="Last Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={passengerDetails.email}
//           readOnly
//           placeholder="Email"
//         />
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={passengerDetails.dateOfBirth}
//           onChange={handlePassengerChange}
//           placeholder="Date of Birth"
//         />
//         <select
//           name="gender"
//           value={passengerDetails.gender}
//           onChange={handlePassengerChange}
//         >
//           <option value="">Select Gender</option>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//           <option value="OTHER">Other</option>
//         </select>
//         <input
//           type="text"
//           name="contactDetails"
//           value={passengerDetails.contactDetails}
//           onChange={handlePassengerChange}
//           placeholder="Contact Number"
//         />
//         <input
//           type="text"
//           name="passport"
//           value={passengerDetails.passport}
//           onChange={handlePassengerChange}
//           placeholder="Passport ID"
//         />
//       </div>

//       <button className="btn btn-success mt-3" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default BookingSeats;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingSeats = () => {
//   const [email, setEmail] = useState("");
//   const [passengerDetails, setPassengerDetails] = useState(null);

//   // ✅ Fetch Passenger Data by Email
//   const fetchPassengerDetails = () => {
//     axios
//       .get(`http://localhost:8080/booking/getByEmail?email=${email}`)
//       .then((response) => setPassengerDetails(response.data))
//       .catch(() => {
//         toast.error("Passenger not found! Please enter details manually.");
//         setPassengerDetails(null);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Enter Your Email to Retrieve Details</h2>

//       {/* ✅ Email Input */}
//       <div className="email-input">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={fetchPassengerDetails}>
//           Fetch Details
//         </button>
//       </div>

//       {/* ✅ Passenger Details Form (Auto-filled if found) */}
//       {passengerDetails && (
//         <div className="passenger-form">
//           <input type="text" value={passengerDetails.firstName} readOnly />
//           <input type="text" value={passengerDetails.lastName} readOnly />
//           <input type="email" value={passengerDetails.email} readOnly />
//           <input type="date" value={passengerDetails.dateOfBirth} readOnly />
//           <input type="text" value={passengerDetails.gender} readOnly />
//           <input type="text" value={passengerDetails.contactDetails} readOnly />
//           <input type="text" value={passengerDetails.passport} readOnly />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingSeats;

// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const BookFlight = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flightId = new URLSearchParams(location.search).get("flightId");

//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [updating, setUpdating] = useState(false);

//   // ✅ Fetch Passenger Details by Email
//   const fetchPassenger = () => {
//     axios
//       .get(`http://localhost:8080/booking/getByEmail?email=${email}`)
//       .then((response) => {
//         setPassenger(response.data);
//         setUpdating(true);
//       })
//       .catch(() => toast.error("Passenger not found!"));
//   };

//   // ✅ Update Passenger Details & Book Flight
//   const handlePayNow = () => {
//     axios
//       .put("http://localhost:8080/booking/updatePassenger", passenger)
//       .then(() => {
//         toast.success("Payment Successful! Booking Confirmed!");
//         navigate("/bookingConfirmation");
//       })
//       .catch(() => toast.error("Error updating passenger details!"));
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Book Your Flight</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={fetchPassenger}>Fetch Details</button>

//       {updating && passenger && (
//         <div className="mt-4">
//           <h4>Passenger Details</h4>
//           <input
//             type="text"
//             placeholder="Contact Number"
//             value={passenger.contactDetails}
//             onChange={(e) =>
//               setPassenger({ ...passenger, contactDetails: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Passport ID"
//             value={passenger.passport}
//             onChange={(e) =>
//               setPassenger({ ...passenger, passport: e.target.value })
//             }
//           />
//           <input
//             type="date"
//             value={passenger.dateOfBirth}
//             onChange={(e) =>
//               setPassenger({ ...passenger, dateOfBirth: e.target.value })
//             }
//           />
//           <button onClick={handlePayNow} className="btn btn-success mt-3">
//             Pay Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookFlight;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingForm = ({ flightId, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Passenger Data by Email
//   const fetchPassenger = () => {
//     if (!email) {
//       toast.error("Please enter an email!");
//       return;
//     }
//     setLoading(true);
//     axios
//       .get(`http://localhost:8080/booking/getByEmail?email=${email}`)
//       .then((response) => {
//         setPassenger(response.data);
//         toast.success("Passenger details retrieved!");
//       })
//       .catch(() => toast.error("Passenger not found!"))
//       .finally(() => setLoading(false));
//   };

//   // ✅ Handle Form Update
//   const handleInputChange = (e) => {
//     setPassenger({ ...passenger, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Payment & Passenger Update
//   const handlePayNow = () => {
//     if (!passenger.contactDetails || !passenger.passport) {
//       toast.error("Please enter contact details and passport ID!");
//       return;
//     }

//     axios
//       .put("http://localhost:8080/booking/updatePassenger", passenger)
//       .then(() => {
//         toast.success("Details updated & Booking Confirmed!");
//         onClose(); // Close form after success
//       })
//       .catch(() => toast.error("Error updating details!"));
//   };

//   return (
//     <div className="booking-form">
//       <h2>Enter Your Email</h2>
//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={fetchPassenger} disabled={loading}>
//         {loading ? "Fetching..." : "Get Details"}
//       </button>

//       {passenger && (
//         <div>
//           <h3>Passenger Details</h3>
//           <input
//             type="text"
//             name="contactDetails"
//             placeholder="Contact Number"
//             value={passenger.contactDetails || ""}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="passport"
//             placeholder="Passport ID"
//             value={passenger.passport || ""}
//             onChange={handleInputChange}
//           />
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={passenger.dateOfBirth || ""}
//             onChange={handleInputChange}
//           />
//           <button className="pay-btn" onClick={handlePayNow}>
//             Pay Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingForm = ({ flightId, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [debugInfo, setDebugInfo] = useState(null);

//   // API base URL - centralize for easier configuration
//   const API_BASE_URL = "http://localhost:8080";

//   // Fetch Passenger Data by Email
//   const fetchPassenger = () => {
//     if (!email) {
//       toast.error("Please enter an email!");
//       return;
//     }

//     setLoading(true);
//     setDebugInfo(null);

//     // Create the full URL
//     const url = `${API_BASE_URL}/booking/getByEmail?email=${encodeURIComponent(
//       email
//     )}`;
//     console.log("Fetching passenger from:", url);

//     axios
//       .get(url)
//       .then((response) => {
//         console.log("Fetch response:", response.data);
//         setPassenger(response.data);
//         toast.success("Passenger details retrieved!");
//       })
//       .catch((error) => {
//         console.error("Error fetching passenger:", error);
//         setDebugInfo({
//           error: "Fetch Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         toast.error("Passenger not found or server error!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle Input Change
//   const handleInputChange = (e) => {
//     setPassenger({ ...passenger, [e.target.name]: e.target.value });
//   };

//   // Handle Payment & Update Passenger
//   const handlePayNow = () => {
//     if (!passenger || !passenger.email) {
//       toast.error("Email is required for updating passenger details!");
//       return;
//     }

//     if (!passenger.contactDetails || !passenger.passport) {
//       toast.error("Please enter contact details and passport ID!");
//       return;
//     }

//     setIsSubmitting(true);
//     setDebugInfo(null);

//     // Create a payload object with all necessary fields
//     const payload = {
//       ...passenger,
//       flightId: flightId || passenger.flightId,
//     };

//     console.log("Updating passenger with payload:", payload);

//     // Create the full URL
//     const url = `${API_BASE_URL}/booking/updatePassenger`;

//     axios
//       .put(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("Update response:", response.data);
//         toast.success("Details updated & Booking Confirmed!");
//         onClose(); // Close form after success
//       })
//       .catch((error) => {
//         console.error("Error updating passenger:", error);
//         setDebugInfo({
//           error: "Update Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//           sentPayload: payload,
//         });
//         toast.error("Database update failed! See console for details.");
//       })
//       .finally(() => setIsSubmitting(false));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="booking-form">
//         <h2>Enter Your Email</h2>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={fetchPassenger} disabled={loading}>
//           {loading ? "Fetching..." : "Get Details"}
//         </button>

//         {passenger && (
//           <div>
//             <h3>Passenger Details</h3>
//             <input
//               type="text"
//               name="contactDetails"
//               placeholder="Contact Number"
//               value={passenger.contactDetails || ""}
//               onChange={handleInputChange}
//             />
//             <select
//               name="gender"
//               placeholder="Gender"
//               value={passenger.gender || ""}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>
//             <input
//               type="text"
//               name="passport"
//               placeholder="Passport ID"
//               value={passenger.passport || ""}
//               onChange={handleInputChange}
//             />
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={passenger.dateOfBirth || ""}
//               onChange={handleInputChange}
//             />
//             <button
//               className="pay-btn"
//               onClick={handlePayNow}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Processing..." : "Pay Now"}
//             </button>

//             {/* Add a "Test Connection" button */}
//             <button
//               className="test-btn"
//               onClick={() => {
//                 axios
//                   .get(`${API_BASE_URL}/health`)
//                   .then((res) => {
//                     toast.success("Server connection successful!");
//                     console.log("Server health check:", res.data);
//                   })
//                   .catch((err) => {
//                     toast.error("Cannot connect to server!");
//                     console.error("Server connection failed:", err);
//                   });
//               }}
//             >
//               Test Server Connection
//             </button>
//           </div>
//         )}

//         {/* Debug information section */}
//         {debugInfo && (
//           <div
//             className="debug-info"
//             style={{
//               marginTop: "20px",
//               padding: "10px",
//               backgroundColor: "#ffeeee",
//               border: "1px solid #ff0000",
//             }}
//           >
//             <h4>Debug Information</h4>
//             <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingForm = ({ flightId, onClose }) => {
//   // State management for multi-step form
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);
//   const [bookingId, setBookingId] = useState(null);

//   // API base URL
//   const API_BASE_URL = "http://localhost:8080";

//   // Fetch available seats for the flight
//   useEffect(() => {
//     if (step === 3 && flightId) {
//       setLoading(true);
//       axios
//         .get(`${API_BASE_URL}/flight/availableSeats?flightId=${flightId}`)
//         .then((response) => {
//           setAvailableSeats(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching available seats:", error);
//           toast.error("Failed to load available seats!");
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [step, flightId]);

//   // Fetch Passenger Data by Email
//   const fetchPassenger = () => {
//     if (!email) {
//       toast.error("Please enter an email!");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `${API_BASE_URL}/booking/getByEmail?email=${encodeURIComponent(email)}`
//       )
//       .then((response) => {
//         if (response.data) {
//           setPassenger(response.data);
//           toast.success("Passenger details retrieved!");
//           // Move to next step
//           setStep(2);
//         } else {
//           toast.warning("No passenger found. Please register first.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching passenger:", error);
//         toast.error("Passenger not found or server error!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle Input Change for passenger details
//   const handleInputChange = (e) => {
//     setPassenger({ ...passenger, [e.target.name]: e.target.value });
//   };

//   // Handle seat selection
//   const handleSeatSelect = (seat) => {
//     setSelectedSeat(seat);
//   };

//   // Handle continue to seat selection
//   const handleContinueToSeatSelection = () => {
//     // Validate mandatory fields
//     if (!passenger.contactDetails || !passenger.passport) {
//       toast.error("Please fill all mandatory fields!");
//       return;
//     }

//     // Update passenger details first
//     setLoading(true);
//     axios
//       .put(`${API_BASE_URL}/booking/updatePassenger`, passenger)
//       .then(() => {
//         toast.success("Passenger details updated!");
//         setStep(3); // Move to seat selection
//       })
//       .catch((error) => {
//         console.error("Error updating passenger details:", error);
//         toast.error("Failed to update passenger details!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle booking confirmation
//   const handleBookSeat = () => {
//     if (!selectedSeat) {
//       toast.error("Please select a seat!");
//       return;
//     }

//     setLoading(true);

//     // Create a booking record
//     const bookingData = {
//       flightId: flightId,
//       passengerId: passenger.id,
//       seatId: selectedSeat.id,
//       bookingDate: new Date().toISOString().split("T")[0],
//       bookingStatus: "CONFIRMED",
//     };

//     // Create booking with seat
//     axios
//       .post(`${API_BASE_URL}/booking/create`, bookingData)
//       .then((response) => {
//         setBookingId(response.data.bookingId);
//         setBookingConfirmed(true);
//         toast.success("Seat booked successfully!");
//         setStep(4); // Move to payment step
//       })
//       .catch((error) => {
//         console.error("Error booking seat:", error);
//         toast.error("Failed to book seat!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle payment
//   const handlePayment = () => {
//     if (!bookingId) {
//       toast.error("Booking ID not found!");
//       return;
//     }

//     setLoading(true);

//     // Simulate payment process
//     const paymentData = {
//       bookingId: bookingId,
//       amount: selectedSeat.price,
//       paymentMethod: "CREDIT_CARD", // This could be selected by user
//       paymentStatus: "COMPLETED",
//     };

//     // Process payment
//     axios
//       .post(`${API_BASE_URL}/payment/process`, paymentData)
//       .then(() => {
//         toast.success("Payment successful! Your booking is confirmed.");
//         setStep(5); // Move to confirmation step
//       })
//       .catch((error) => {
//         console.error("Error processing payment:", error);
//         toast.error("Payment failed!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Render form based on current step
//   const renderStep = () => {
//     switch (step) {
//       case 1: // Email input
//         return (
//           <div className="email-step">
//             <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
//             <input
//               type="email"
//               className="w-full p-2 border rounded mb-3"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//             />
//             <button
//               className="w-full bg-blue-500 text-white p-2 rounded"
//               onClick={fetchPassenger}
//               disabled={loading}
//             >
//               {loading ? "Fetching..." : "Get Details"}
//             </button>
//           </div>
//         );

//       case 2: // Passenger details
//         return (
//           <div className="passenger-details-step">
//             <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-2 border rounded bg-gray-100"
//                 value={passenger.email || ""}
//                 disabled
//               />
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">
//                 Contact Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="contactDetails"
//                 className="w-full p-2 border rounded"
//                 placeholder="Contact Number"
//                 value={passenger.contactDetails || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Gender</label>
//               <select
//                 name="gender"
//                 className="w-full p-2 border rounded"
//                 value={passenger.gender || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="MALE">Male</option>
//                 <option value="FEMALE">Female</option>
//                 <option value="OTHER">Other</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">
//                 Passport ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="passport"
//                 className="w-full p-2 border rounded"
//                 placeholder="Passport ID"
//                 value={passenger.passport || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 className="w-full p-2 border rounded"
//                 value={passenger.dateOfBirth || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="flex justify-between">
//               <button
//                 className="bg-gray-500 text-white p-2 rounded"
//                 onClick={() => setStep(1)}
//                 disabled={loading}
//               >
//                 Back
//               </button>
//               <button
//                 className="bg-blue-500 text-white p-2 rounded"
//                 onClick={handleContinueToSeatSelection}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Continue to Seat Selection"}
//               </button>
//             </div>
//           </div>
//         );

//       case 3: // Seat selection
//         return (
//           <div className="seat-selection-step">
//             <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>

//             {loading ? (
//               <div className="text-center py-8">Loading available seats...</div>
//             ) : (
//               <>
//                 <div className="seat-map grid grid-cols-6 gap-2 mb-4">
//                   {availableSeats.length === 0 ? (
//                     <div className="col-span-6 text-center py-4">
//                       No seats available
//                     </div>
//                   ) : (
//                     availableSeats.map((seat) => (
//                       <div
//                         key={seat.id}
//                         className={`seat p-2 border rounded text-center cursor-pointer ${
//                           selectedSeat && selectedSeat.id === seat.id
//                             ? "bg-blue-500 text-white"
//                             : "bg-white hover:bg-blue-100"
//                         }`}
//                         onClick={() => handleSeatSelect(seat)}
//                       >
//                         {seat.seatNumber}
//                         <div className="text-xs">{seat.price} USD</div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {selectedSeat && (
//                   <div className="selected-seat-info mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
//                     <h3 className="font-medium">Selected Seat:</h3>
//                     <p>Seat Number: {selectedSeat.seatNumber}</p>
//                     <p>Class: {selectedSeat.seatClass}</p>
//                     <p>Price: {selectedSeat.price} USD</p>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <button
//                     className="bg-gray-500 text-white p-2 rounded"
//                     onClick={() => setStep(2)}
//                   >
//                     Back
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white p-2 rounded"
//                     onClick={handleBookSeat}
//                     disabled={!selectedSeat || loading}
//                   >
//                     {loading ? "Processing..." : "Book Seat"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         );

//       case 4: // Payment
//         return (
//           <div className="payment-step">
//             <h2 className="text-xl font-bold mb-4">Complete Payment</h2>

//             <div className="booking-summary mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
//               <h3 className="font-medium mb-2">Booking Summary</h3>
//               <p>Booking ID: {bookingId}</p>
//               <p>Passenger: {passenger.email}</p>
//               <p>Flight ID: {flightId}</p>
//               <p>
//                 Seat: {selectedSeat.seatNumber} ({selectedSeat.seatClass})
//               </p>
//               <p className="font-bold mt-2">Total: {selectedSeat.price} USD</p>
//             </div>

//             <div className="payment-method mb-4">
//               <h3 className="font-medium mb-2">Payment Method</h3>
//               <div className="flex items-center mb-2">
//                 <input
//                   type="radio"
//                   id="creditCard"
//                   name="paymentMethod"
//                   checked
//                   readOnly
//                 />
//                 <label htmlFor="creditCard" className="ml-2">
//                   Credit Card
//                 </label>
//               </div>

//               {/* Payment details form (simplified) */}
//               <div className="credit-card-form">
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium mb-1">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="1234 5678 9012 3456"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium mb-1">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded"
//                       placeholder="MM/YY"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="block text-sm font-medium mb-1">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded"
//                       placeholder="123"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="block text-sm font-medium mb-1">
//                     Cardholder Name
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 className="bg-gray-500 text-white p-2 rounded"
//                 onClick={() => setStep(3)}
//               >
//                 Back
//               </button>
//               <button
//                 className="bg-green-600 text-white p-2 rounded"
//                 onClick={handlePayment}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Now"}
//               </button>
//             </div>
//           </div>
//         );

//       case 5: // Confirmation
//         return (
//           <div className="confirmation-step text-center">
//             <div className="mb-6">
//               <svg
//                 className="mx-auto text-green-500 w-16 h-16"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 ></path>
//               </svg>
//             </div>

//             <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
//             <p className="mb-2">Thank you for your booking.</p>
//             <p className="mb-4">
//               Your booking ID is: <span className="font-bold">{bookingId}</span>
//             </p>
//             <p className="mb-6">
//               A confirmation email has been sent to {passenger.email}
//             </p>

//             <button
//               className="bg-blue-500 text-white p-2 rounded"
//               onClick={onClose}
//             >
//               Close
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="booking-form bg-white rounded-lg shadow-md p-6">
//         {/* Progress bar */}
//         {step < 5 && (
//           <div className="progress-bar mb-6">
//             <div className="flex justify-between mb-1">
//               <span className={step >= 1 ? "text-blue-500 font-medium" : ""}>
//                 Email
//               </span>
//               <span className={step >= 2 ? "text-blue-500 font-medium" : ""}>
//                 Details
//               </span>
//               <span className={step >= 3 ? "text-blue-500 font-medium" : ""}>
//                 Seat
//               </span>
//               <span className={step >= 4 ? "text-blue-500 font-medium" : ""}>
//                 Payment
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-blue-500 h-2.5 rounded-full"
//                 style={{ width: `${(step / 4) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* Render current step */}
//         {renderStep()}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingForm = ({ flightId, onClose }) => {
//   // State management for multi-step form
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);
//   const [bookingId, setBookingId] = useState(null);
//   const [debugInfo, setDebugInfo] = useState(null);

//   // API base URL
//   const API_BASE_URL = "http://localhost:8080";

//   // Fetch available seats for the flight
//   useEffect(() => {
//     if (step === 3 && flightId) {
//       setLoading(true);
//       axios
//         .get(`${API_BASE_URL}/flight/availableSeats?flightId=${flightId}`)
//         .then((response) => {
//           setAvailableSeats(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching available seats:", error);
//           toast.error("Failed to load available seats!");
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [step, flightId]);

//   // Fetch Passenger Data by Email
//   const fetchPassenger = () => {
//     if (!email) {
//       toast.error("Please enter an email!");
//       return;
//     }

//     setLoading(true);
//     setDebugInfo(null);

//     axios
//       .get(
//         `${API_BASE_URL}/booking/getByEmail?email=${encodeURIComponent(email)}`
//       )
//       .then((response) => {
//         console.log("Passenger data from API:", response.data);
//         if (response.data) {
//           setPassenger(response.data);
//           toast.success("Passenger details retrieved!");
//           // Move to next step
//           setStep(2);
//         } else {
//           toast.warning("No passenger found. Please register first.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching passenger:", error);
//         setDebugInfo({
//           error: "Fetch Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//         toast.error("Passenger not found or server error!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle Input Change for passenger details
//   const handleInputChange = (e) => {
//     setPassenger({ ...passenger, [e.target.name]: e.target.value });
//   };

//   // Handle seat selection
//   const handleSeatSelect = (seat) => {
//     setSelectedSeat(seat);
//   };

//   // Handle continue to seat selection
//   const handleContinueToSeatSelection = () => {
//     // Validate mandatory fields
//     if (!passenger.contactDetails || !passenger.passport) {
//       toast.error("Please fill all mandatory fields!");
//       return;
//     }

//     // Make sure we have a passengerId
//     if (!passenger.id && !passenger.passengerId) {
//       toast.error(
//         "Passenger ID is missing. Please try fetching your details again."
//       );
//       return;
//     }

//     // Prepare payload for update
//     const passengerData = {
//       ...passenger,
//       // Ensure we're using the correct passenger ID property
//       id: passenger.id || passenger.passengerId,
//     };

//     console.log("Sending passenger update with data:", passengerData);
//     setDebugInfo(null);
//     setLoading(true);

//     axios
//       .put(`${API_BASE_URL}/booking/updatePassenger`, passengerData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("Update response:", response.data);
//         toast.success("Passenger details updated!");
//         setStep(3); // Move to seat selection
//       })
//       .catch((error) => {
//         console.error("Error updating passenger details:", error);
//         setDebugInfo({
//           error: "Update Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//           sentPayload: passengerData,
//         });
//         toast.error("Failed to update passenger details!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle booking confirmation
//   const handleBookSeat = () => {
//     if (!selectedSeat) {
//       toast.error("Please select a seat!");
//       return;
//     }

//     setLoading(true);
//     setDebugInfo(null);

//     // Get passenger ID
//     const passengerId = passenger.id || passenger.passengerId;

//     // Create a booking record
//     const bookingData = {
//       flightId: flightId,
//       passengerId: passengerId,
//       seatId: selectedSeat.id,
//       bookingDate: new Date().toISOString().split("T")[0],
//       bookingStatus: "CONFIRMED",
//     };

//     console.log("Creating booking with data:", bookingData);

//     // Create booking with seat
//     axios
//       .post(`${API_BASE_URL}/booking/create`, bookingData)
//       .then((response) => {
//         console.log("Booking response:", response.data);
//         // Check if response contains the booking ID directly or nested
//         const responseBookingId =
//           response.data?.bookingId || response.data?.id || response.data;
//         setBookingId(responseBookingId);
//         setBookingConfirmed(true);
//         toast.success("Seat booked successfully!");
//         setStep(4); // Move to payment step
//       })
//       .catch((error) => {
//         console.error("Error booking seat:", error);
//         setDebugInfo({
//           error: "Booking Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//           sentPayload: bookingData,
//         });
//         toast.error("Failed to book seat!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle payment
//   const handlePayment = () => {
//     if (!bookingId) {
//       toast.error("Booking ID not found!");
//       return;
//     }

//     setLoading(true);
//     setDebugInfo(null);

//     // Simulate payment process
//     const paymentData = {
//       bookingId: bookingId,
//       amount: selectedSeat.price,
//       paymentMethod: "CREDIT_CARD", // This could be selected by user
//       paymentStatus: "COMPLETED",
//     };

//     console.log("Processing payment with data:", paymentData);

//     // Process payment
//     axios
//       .post(`${API_BASE_URL}/payment/process`, paymentData)
//       .then((response) => {
//         console.log("Payment response:", response.data);
//         toast.success("Payment successful! Your booking is confirmed.");
//         setStep(5); // Move to confirmation step
//       })
//       .catch((error) => {
//         console.error("Error processing payment:", error);
//         setDebugInfo({
//           error: "Payment Error",
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//           sentPayload: paymentData,
//         });
//         toast.error("Payment failed!");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Render form based on current step
//   const renderStep = () => {
//     switch (step) {
//       case 1: // Email input
//         return (
//           <div className="email-step">
//             <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
//             <input
//               type="email"
//               className="w-full p-2 border rounded mb-3"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//             />
//             <button
//               className="w-full bg-blue-500 text-white p-2 rounded"
//               onClick={fetchPassenger}
//               disabled={loading}
//             >
//               {loading ? "Fetching..." : "Get Details"}
//             </button>
//           </div>
//         );

//       case 2: // Passenger details
//         return (
//           <div className="passenger-details-step">
//             <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-2 border rounded bg-gray-100"
//                 value={passenger.email || ""}
//                 disabled
//               />
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">
//                 Contact Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="contactDetails"
//                 className="w-full p-2 border rounded"
//                 placeholder="Contact Number"
//                 value={passenger.contactDetails || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">Gender</label>
//               <select
//                 name="gender"
//                 className="w-full p-2 border rounded"
//                 value={passenger.gender || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="MALE">Male</option>
//                 <option value="FEMALE">Female</option>
//                 <option value="OTHER">Other</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="block text-sm font-medium mb-1">
//                 Passport ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="passport"
//                 className="w-full p-2 border rounded"
//                 placeholder="Passport ID"
//                 value={passenger.passport || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 className="w-full p-2 border rounded"
//                 value={passenger.dateOfBirth || ""}
//                 onChange={handleInputChange}
//                 disabled={loading}
//               />
//             </div>

//             <div className="flex justify-between">
//               <button
//                 className="bg-gray-500 text-white p-2 rounded"
//                 onClick={() => setStep(1)}
//                 disabled={loading}
//               >
//                 Back
//               </button>
//               <button
//                 className="bg-blue-500 text-white p-2 rounded"
//                 onClick={handleContinueToSeatSelection}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Continue to Seat Selection"}
//               </button>
//             </div>
//           </div>
//         );

//       case 3: // Seat selection
//         return (
//           <div className="seat-selection-step">
//             <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>

//             {loading ? (
//               <div className="text-center py-8">Loading available seats...</div>
//             ) : (
//               <>
//                 <div className="seat-map grid grid-cols-6 gap-2 mb-4">
//                   {availableSeats.length === 0 ? (
//                     <div className="col-span-6 text-center py-4">
//                       No seats available
//                     </div>
//                   ) : (
//                     availableSeats.map((seat) => (
//                       <div
//                         key={seat.id}
//                         className={`seat p-2 border rounded text-center cursor-pointer ${
//                           selectedSeat && selectedSeat.id === seat.id
//                             ? "bg-blue-500 text-white"
//                             : "bg-white hover:bg-blue-100"
//                         }`}
//                         onClick={() => handleSeatSelect(seat)}
//                       >
//                         {seat.seatNumber}
//                         <div className="text-xs">{seat.price} USD</div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {selectedSeat && (
//                   <div className="selected-seat-info mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
//                     <h3 className="font-medium">Selected Seat:</h3>
//                     <p>Seat Number: {selectedSeat.seatNumber}</p>
//                     <p>Class: {selectedSeat.seatClass}</p>
//                     <p>Price: {selectedSeat.price} USD</p>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <button
//                     className="bg-gray-500 text-white p-2 rounded"
//                     onClick={() => setStep(2)}
//                   >
//                     Back
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white p-2 rounded"
//                     onClick={handleBookSeat}
//                     disabled={!selectedSeat || loading}
//                   >
//                     {loading ? "Processing..." : "Book Seat"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         );

//       case 4: // Payment
//         return (
//           <div className="payment-step">
//             <h2 className="text-xl font-bold mb-4">Complete Payment</h2>

//             <div className="booking-summary mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
//               <h3 className="font-medium mb-2">Booking Summary</h3>
//               <p>Booking ID: {bookingId}</p>
//               <p>Passenger: {passenger.email}</p>
//               <p>Flight ID: {flightId}</p>
//               <p>
//                 Seat: {selectedSeat.seatNumber} ({selectedSeat.seatClass})
//               </p>
//               <p className="font-bold mt-2">Total: {selectedSeat.price} USD</p>
//             </div>

//             <div className="payment-method mb-4">
//               <h3 className="font-medium mb-2">Payment Method</h3>
//               <div className="flex items-center mb-2">
//                 <input
//                   type="radio"
//                   id="creditCard"
//                   name="paymentMethod"
//                   checked
//                   readOnly
//                 />
//                 <label htmlFor="creditCard" className="ml-2">
//                   Credit Card
//                 </label>
//               </div>

//               {/* Payment details form (simplified) */}
//               <div className="credit-card-form">
//                 <div className="mb-3">
//                   <label className="block text-sm font-medium mb-1">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="1234 5678 9012 3456"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium mb-1">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded"
//                       placeholder="MM/YY"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="block text-sm font-medium mb-1">
//                       CVV
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded"
//                       placeholder="123"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="block text-sm font-medium mb-1">
//                     Cardholder Name
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 className="bg-gray-500 text-white p-2 rounded"
//                 onClick={() => setStep(3)}
//               >
//                 Back
//               </button>
//               <button
//                 className="bg-green-600 text-white p-2 rounded"
//                 onClick={handlePayment}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Now"}
//               </button>
//             </div>
//           </div>
//         );

//       case 5: // Confirmation
//         return (
//           <div className="confirmation-step text-center">
//             <div className="mb-6">
//               <svg
//                 className="mx-auto text-green-500 w-16 h-16"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5 13l4 4L19 7"
//                 ></path>
//               </svg>
//             </div>

//             <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
//             <p className="mb-2">Thank you for your booking.</p>
//             <p className="mb-4">
//               Your booking ID is: <span className="font-bold">{bookingId}</span>
//             </p>
//             <p className="mb-6">
//               A confirmation email has been sent to {passenger.email}
//             </p>

//             <button
//               className="bg-blue-500 text-white p-2 rounded"
//               onClick={onClose}
//             >
//               Close
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="booking-form bg-white rounded-lg shadow-md p-6">
//         {/* Progress bar */}
//         {step < 5 && (
//           <div className="progress-bar mb-6">
//             <div className="flex justify-between mb-1">
//               <span className={step >= 1 ? "text-blue-500 font-medium" : ""}>
//                 Email
//               </span>
//               <span className={step >= 2 ? "text-blue-500 font-medium" : ""}>
//                 Details
//               </span>
//               <span className={step >= 3 ? "text-blue-500 font-medium" : ""}>
//                 Seat
//               </span>
//               <span className={step >= 4 ? "text-blue-500 font-medium" : ""}>
//                 Payment
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-blue-500 h-2.5 rounded-full"
//                 style={{ width: `${(step / 4) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* Render current step */}
//         {renderStep()}

//         {/* Debug information for troubleshooting */}
//         {debugInfo && (
//           <div className="debug-info mt-6 p-4 bg-red-50 border border-red-200 rounded text-sm">
//             <h4 className="font-bold mb-2">Debug Information</h4>
//             <pre className="whitespace-pre-wrap">
//               {JSON.stringify(debugInfo, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
/////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookingForm = ({ flightId, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [passenger, setPassenger] = useState(null);
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Passenger Data by Email
//   const fetchPassenger = () => {
//     if (!email.trim()) {
//       toast.error("Please enter a valid email!");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `http://localhost:8080/booking/getByEmail?email=${encodeURIComponent(
//           email
//         )}`
//       )
//       .then((response) => {
//         setPassenger(response.data);
//         toast.success("Passenger details retrieved!");
//         setStep(2); // Move to next step
//       })
//       .catch(() => toast.error("Passenger not found!"))
//       .finally(() => setLoading(false));
//   };

//   // ✅ Fetch Available Seats for Selected Flight
//   useEffect(() => {
//     if (flightId && step === 3) {
//       axios
//         .get(
//           `http://localhost:8080/flight/getAvailableSeats?flightId=${flightId}`
//         )
//         .then((response) => setAvailableSeats(response.data))
//         .catch(() => toast.error("Error fetching available seats!"));
//     }
//   }, [flightId, step]);

//   // ✅ Handle Passenger Input Change
//   const handleInputChange = (e) => {
//     setPassenger({ ...passenger, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Seat Selection
//   const handleSeatSelect = (seat) => {
//     setSelectedSeat(seat);
//   };

//   // ✅ Confirm Passenger Details and Move to Seat Selection
//   const handleConfirmPassenger = () => {
//     if (!passenger.contactDetails || !passenger.passport) {
//       toast.error("Please fill all required fields!");
//       return;
//     }
//     setStep(3);
//   };

//   // ✅ Confirm Booking
//   const handleBookSeat = () => {
//     if (!selectedSeat) {
//       toast.error("Please select a seat!");
//       return;
//     }

//     const bookingData = {
//       flightId: flightId,
//       passengerId: passenger.passengerId,
//       seatId: selectedSeat.seatId,
//       bookingDate: new Date().toISOString().split("T")[0],
//       bookingStatus: "CONFIRMED",
//     };

//     axios
//       .post("http://localhost:8080/booking/create", bookingData)
//       .then(() => {
//         toast.success("Booking successful!");
//         onClose();
//       })
//       .catch(() => toast.error("Error booking seat!"));
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold text-center mb-4">Book Your Seat</h2>

//       {/* ✅ Step 1: Enter Email */}
//       {step === 1 && (
//         <div className="text-center">
//           <input
//             type="email"
//             className="w-full p-2 border rounded mb-3"
//             placeholder="Enter Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={loading}
//           />
//           <button
//             className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//             onClick={fetchPassenger}
//             disabled={loading}
//           >
//             {loading ? "Fetching..." : "Get Details"}
//           </button>
//         </div>
//       )}

//       {/* ✅ Step 2: Passenger Details */}
//       {step === 2 && passenger && (
//         <div>
//           <h3 className="text-lg font-bold mb-3">Passenger Details</h3>

//           <div className="mb-3">
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full p-2 border rounded bg-gray-100"
//               value={passenger.email}
//               disabled
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-sm font-medium">
//               Contact Number *
//             </label>
//             <input
//               type="text"
//               name="contactDetails"
//               className="w-full p-2 border rounded"
//               placeholder="Enter Contact Number"
//               value={passenger.contactDetails || ""}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-sm font-medium">Gender</label>
//             <select
//               name="gender"
//               className="w-full p-2 border rounded"
//               value={passenger.gender || ""}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="block text-sm font-medium">Passport ID *</label>
//             <input
//               type="text"
//               name="passport"
//               className="w-full p-2 border rounded"
//               placeholder="Enter Passport ID"
//               value={passenger.passport || ""}
//               onChange={handleInputChange}
//             />
//           </div>

//           <button
//             className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
//             onClick={handleConfirmPassenger}
//           >
//             Continue to Seat Selection
//           </button>
//         </div>
//       )}

//       {/* ✅ Step 3: Seat Selection */}
//       {step === 3 && (
//         <div>
//           <h3 className="text-lg font-bold mb-3">Select Your Seat</h3>

//           <div className="grid grid-cols-6 gap-2">
//             {availableSeats.map((seat) => (
//               <button
//                 key={seat.seatId}
//                 className={`p-2 border rounded text-center cursor-pointer ${
//                   selectedSeat && selectedSeat.seatId === seat.seatId
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleSeatSelect(seat)}
//               >
//                 {seat.seatNumber}
//               </button>
//             ))}
//           </div>

//           {selectedSeat && (
//             <div className="mt-4 text-center">
//               <h4 className="font-bold">
//                 Selected Seat: {selectedSeat.seatNumber}
//               </h4>
//               <button
//                 className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 mt-3"
//                 onClick={handleBookSeat}
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;

// import React, { useState, useEffect } from "react";
// // import "./PassengerForm.css"; // Import CSS for styling

// const PassengerForm = ({ flightId, seatId, onPayment }) => {
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [passport, setPassport] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [contactDetails, setContactDetails] = useState("");
//   const [passengerDataLoaded, setPassengerDataLoaded] = useState(false); //Track if data is loaded from backend
//   const [formError, setFormError] = useState(""); // Track form input validation errors
//   const [apiError, setApiError] = useState(""); // Track API errors
//   const [loading, setLoading] = useState(false);

//   const clearForm = () => {
//     setFirstName("");
//     setLastName("");
//     setPassport("");
//     setDateOfBirth("");
//     setGender("Male");
//     setContactDetails("");
//   };

//   const handleRetrieveInfo = async () => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const apiUrl = `http://localhost:8080/booking/getByEmail?email=${email}`; // Replace with your actual API endpoint
//       const response = await fetch(apiUrl);

//       if (response.ok) {
//         const data = await response.json();
//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setPassport(data.passport || "");
//         setDateOfBirth(
//           data.dateOfBirth
//             ? new Date(data.dateOfBirth).toISOString().split("T")[0]
//             : ""
//         ); //format the date to yyyy-MM-dd
//         setGender(data.gender || "Male");
//         setContactDetails(data.contactDetails || "");
//         setPassengerDataLoaded(true);
//       } else if (response.status === 404) {
//         setApiError("Passenger not found with this email.");
//         clearForm();
//       } else {
//         setApiError(`Error retrieving passenger info: ${response.status}`);
//       }
//     } catch (error) {
//       setApiError(`Error retrieving passenger info: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setApiError(""); //Clear any previous API errors.

//   //   // **Client-Side Validation:**
//   //   if (!firstName || !lastName || !passport || !contactDetails) {
//   //     setFormError("Please fill in all required fields.");
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   setFormError("");

//   //   const formData = {
//   //     email,
//   //     firstName,
//   //     lastName,
//   //     passport,
//   //     dateOfBirth,
//   //     gender,
//   //     contactDetails,
//   //     flightId, // Ensure flightId is available (passed as a prop)
//   //     seatId, // Ensure seatId is available (passed as a prop)
//   //   };

//   //   try {
//   //     const apiUrl = `/bookings/create`; // Replace with your actual API endpoint
//   //     const response = await fetch(apiUrl, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (response.ok) {
//   //       const bookingData = await response.json(); // Optional: Process booking data
//   //       // Call the onPayment function, passing the booking details.
//   //       onPayment(bookingData); // Execute payment flow in parent component
//   //       // Optionally redirect to payment page or show success message. The parent component should handle redirection
//   //     } else {
//   //       setApiError(`Error creating booking: ${response.status}`);
//   //     }
//   //   } catch (error) {
//   //     setApiError(`Error creating booking: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setApiError(""); //Clear any previous API errors.

//   //   // **Client-Side Validation:**
//   //   if (!firstName || !lastName || !passport || !contactDetails) {
//   //     setFormError("Please fill in all required fields.");
//   //     setLoading(false);
//   //     return;
//   //   }
//   //   setFormError("");

//   //   const formData = {
//   //     email,
//   //     firstName,
//   //     lastName,
//   //     passport,
//   //     dateOfBirth,
//   //     gender,
//   //     contactDetails,
//   //     flightId, // Ensure flightId is available (passed as a prop)
//   //     seatId, // Ensure seatId is available (passed as a prop)
//   //   };

//   //   try {
//   //     const apiUrl = `http://localhost:8080/booking/updatePassenger`; // Ensure this is your actual API endpoint
//   //     const response = await fetch(apiUrl, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (response.ok) {
//   //       const updatedPassenger = await response.json(); // Optional: Process updated data
//   //       // Call the onPayment function, passing the updated passenger details.
//   //       onPayment(updatedPassenger); // Execute payment flow in parent component
//   //       // Optionally redirect to payment page or show success message. The parent component should handle redirection
//   //     } else {
//   //       setApiError(`Error updating passenger: ${response.status}`);
//   //     }
//   //   } catch (error) {
//   //     setApiError(`Error updating passenger: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setApiError(""); // Clear any previous API errors

//     // Client-Side Validation:
//     if (!firstName || !lastName || !passport || !contactDetails) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }
//     setFormError("");

//     const formData = {
//       // passengerId, // Ensure this is correctly fetched
//       email,
//       firstName,
//       lastName,
//       passport,
//       dateOfBirth,
//       gender,
//       contactDetails,
//     };

//     try {
//       const apiUrl = "http://localhost:8080/booking/updatePassengers"; // Ensure this is your actual API endpoint
//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const updatedPassenger = await response.json(); // Optional: Process updated data
//         onPayment(updatedPassenger); // Execute payment flow in parent component
//       } else {
//         setApiError(`Error updating passenger: ${response.status}`);
//       }
//     } catch (error) {
//       setApiError(`Error updating passenger: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="passenger-form-container">
//         <h2>Passenger Information</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <div className="input-group">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleRetrieveInfo}
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Retrieve Info"}
//               </button>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name:</label>
//             <input
//               type="text"
//               id="firstName"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="lastName">Last Name:</label>
//             <input
//               type="text"
//               id="lastName"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="passport">Passport:</label>
//             <input
//               type="text"
//               id="passport"
//               value={passport}
//               onChange={(e) => setPassport(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="dateOfBirth">Date of Birth:</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select
//               id="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="contactDetails">Contact Details:</label>
//             <input
//               type="text"
//               id="contactDetails"
//               value={contactDetails}
//               onChange={(e) => setContactDetails(e.target.value)}
//               required
//             />
//           </div>

//           {formError && <div className="error-message">{formError}</div>}
//           {apiError && <div className="error-message">{apiError}</div>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Pay Now"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PassengerForm;

// import React, { useState, useEffect } from "react";

// const PassengerForm = ({ flightId, seatId, onPayment }) => {
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [passport, setPassport] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [contactDetails, setContactDetails] = useState("");
//   const [amount, setAmount] = useState(""); // Add amount state
//   const [passengerDataLoaded, setPassengerDataLoaded] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [apiError, setApiError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch flight price when flightId changes
//     const fetchFlightPrice = async () => {
//       if (flightId) {
//         setLoading(true);
//         setApiError("");
//         try {
//           const apiUrl = `http://localhost:8080/flight/${flightId}`; // Replace with your actual API endpoint
//           const response = await fetch(apiUrl);

//           if (response.ok) {
//             const data = await response.json();
//             setAmount(data.price); // Set the flight price to the amount state
//           } else {
//             setApiError(`Error fetching flight price: ${response.status}`);
//           }
//         } catch (error) {
//           setApiError(`Error fetching flight price: ${error.message}`);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchFlightPrice();
//   }, [flightId]);

//   const clearForm = () => {
//     setFirstName("");
//     setLastName("");
//     setPassport("");
//     setDateOfBirth("");
//     setGender("Male");
//     setContactDetails("");
//   };

//   const handleRetrieveInfo = async () => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const apiUrl = `http://localhost:8080/booking/getByEmail?email=${email}`; // Replace with your actual API endpoint
//       const response = await fetch(apiUrl);

//       if (response.ok) {
//         const data = await response.json();
//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setPassport(data.passport || "");
//         setDateOfBirth(
//           data.dateOfBirth
//             ? new Date(data.dateOfBirth).toISOString().split("T")[0]
//             : ""
//         ); // format the date to yyyy-MM-dd
//         setGender(data.gender || "Male");
//         setContactDetails(data.contactDetails || "");
//         setPassengerDataLoaded(true);
//       } else if (response.status === 404) {
//         setApiError("Passenger not found with this email.");
//         clearForm();
//       } else {
//         setApiError(`Error retrieving passenger info: ${response.status}`);
//       }
//     } catch (error) {
//       setApiError(`Error retrieving passenger info: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setApiError("");

//     if (!firstName || !lastName || !passport || !contactDetails) {
//       setFormError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }
//     setFormError("");

//     const formData = {
//       email,
//       firstName,
//       lastName,
//       passport,
//       dateOfBirth,
//       gender,
//       contactDetails,
//       flightId,
//       seatId,
//     };

//     try {
//       const apiUrl = "http://localhost:8080/booking/updatePassengers"; // Ensure this is your actual API endpoint
//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const updatedPassenger = await response.json();
//         onPayment({ ...updatedPassenger, amount }); // Pass amount to the payment function
//       } else {
//         setApiError(`Error updating passenger: ${response.status}`);
//       }
//     } catch (error) {
//       setApiError(`Error updating passenger: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="passenger-form-container">
//         <h2>Passenger Information</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <div className="input-group">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleRetrieveInfo}
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Retrieve Info"}
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="firstName">First Name:</label>
//             <input
//               type="text"
//               id="firstName"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="lastName">Last Name:</label>
//             <input
//               type="text"
//               id="lastName"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="passport">Passport:</label>
//             <input
//               type="text"
//               id="passport"
//               value={passport}
//               onChange={(e) => setPassport(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="dateOfBirth">Date of Birth:</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select
//               id="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="contactDetails">Contact Details:</label>
//             <input
//               type="text"
//               id="contactDetails"
//               value={contactDetails}
//               onChange={(e) => setContactDetails(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input type="number" id="amount" value={amount} readOnly />
//           </div>

//           {formError && <div className="error-message">{formError}</div>}
//           {apiError && <div className="error-message">{apiError}</div>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Pay Now"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PassengerForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PassengerForm = ({ flightId }) => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [passport, setPassport] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [contactDetails, setContactDetails] = useState("");
//   const [amount, setAmount] = useState("");
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [seatNumber, setSeatNumber] = useState("");
//   const [formError, setFormError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch available seats for selected flight
//   useEffect(() => {
//     if (flightId) {
//       axios
//         .get(`http://localhost:8080/booking/available/flightId=${flightId}`)
//         .then((response) => {
//           setAvailableSeats(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching seats:", error);
//         });
//     }
//   }, [flightId]);

//   useEffect(() => {
//     const storedEmail = sessionStorage.getItem("email");
//     const storedAmount = sessionStorage.getItem("amount");

//     if (storedEmail) setEmail(storedEmail);
//     if (storedAmount) setAmount(storedAmount);
//   }, []);

//   // Fetch passenger details by email
//   const handleRetrieveInfo = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/booking/getByEmail?email=${email}`
//       );
//       const data = response.data;
//       setFirstName(data.firstName || "");
//       setLastName(data.lastName || "");
//       setPassport(data.passport || "");
//       setDateOfBirth(data.dateOfBirth || "");
//       setGender(data.gender || "Male");
//       setContactDetails(data.contactDetails || "");
//     } catch (error) {
//       console.error("Error retrieving passenger info:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormError("");

//     if (
//       !firstName ||
//       !lastName ||
//       !passport ||
//       !contactDetails ||
//       !seatNumber
//     ) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     // Redirect to the payment page
//     navigate(
//       `/payment?email=${email}&amount=${amount}&flightId=${flightId}&seatNumber=${seatNumber}`
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2>Passenger Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="button" onClick={handleRetrieveInfo} disabled={loading}>
//             {loading ? "Loading..." : "Retrieve Info"}
//           </button>
//         </div>

//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Passport:</label>
//           <input
//             type="text"
//             value={passport}
//             onChange={(e) => setPassport(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             value={dateOfBirth}
//             onChange={(e) => setDateOfBirth(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Gender:</label>
//           <select value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Contact Details:</label>
//           <input
//             type="text"
//             value={contactDetails}
//             onChange={(e) => setContactDetails(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="number" value={amount} readOnly />
//         </div>

//         <div className="form-group">
//           <label>Seat Number:</label>
//           <select
//             value={seatNumber}
//             onChange={(e) => setSeatNumber(e.target.value)}
//             required
//           >
//             <option value="">Select a Seat</option>
//             {availableSeats.map((seat) => (
//               <option key={seat.seatId} value={seat.seatNumber}>
//                 {seat.seatNumber}
//               </option>
//             ))}
//           </select>
//         </div>

//         {formError && <div className="error-message">{formError}</div>}

//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PassengerForm;
///////////////
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const PassengerForm = ({ flightId, seatId, onPayment }) => {
//   const navigate = useNavigate(); // FIXED: Removed duplicate useNavigate()

//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [passport, setPassport] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [contactDetails, setContactDetails] = useState("");
//   const [amount, setAmount] = useState("");
//   const [formError, setFormError] = useState("");
//   const [apiError, setApiError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const selectedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (selectedFlight && selectedFlight.amount) {
//       setAmount(selectedFlight.amount);
//     }
//   }, []);

//   const handleRetrieveInfo = async () => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const response = await fetch(
//         `http://localhost:8080/booking/getByEmail?email=${email}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setPassport(data.passport || "");
//         setDateOfBirth(
//           data.dateOfBirth
//             ? new Date(data.dateOfBirth).toISOString().split("T")[0]
//             : ""
//         );
//         setGender(data.gender || "Male");
//         setContactDetails(data.contactDetails || "");
//       } else {
//         setApiError("Passenger not found.");
//       }
//     } catch (error) {
//       setApiError("Error retrieving passenger info.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormError("");

//     if (!firstName || !lastName || !passport || !contactDetails) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     // Redirect to the payment page
//     navigate(
//       `/payment?email=${email}&amount=${amount}&flightId=${flightId}&seatId=${seatId}`
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2>Passenger Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="button" onClick={handleRetrieveInfo} disabled={loading}>
//             {loading ? "Loading..." : "Retrieve Info"}
//           </button>
//         </div>
//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Passport:</label>
//           <input
//             type="text"
//             value={passport}
//             onChange={(e) => setPassport(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             value={dateOfBirth}
//             onChange={(e) => setDateOfBirth(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Gender:</label>
//           <select value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Contact Details:</label>
//           <input
//             type="text"
//             value={contactDetails}
//             onChange={(e) => setContactDetails(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="number" value={amount} readOnly />
//         </div>
//         {formError && <div className="error-message">{formError}</div>}
//         {apiError && <div className="error-message">{apiError}</div>}

//         {/* Fixing the button */}
//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PassengerForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const PassengerForm = ({ flightId }) => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [passport, setPassport] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [contactDetails, setContactDetails] = useState("");
//   const [amount, setAmount] = useState("");
//   const [seatId, setSeatId] = useState("");
//   const [availableSeats, setAvailableSeats] = useState([]);
//   const [formError, setFormError] = useState("");
//   const [apiError, setApiError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch email from session and load available seats
//   useEffect(() => {
//     const storedEmail = sessionStorage.getItem("email");
//     if (storedEmail) setEmail(storedEmail);

//     const selectedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
//     if (selectedFlight) {
//       setAmount(selectedFlight.amount || "");
//       fetchAvailableSeats(selectedFlight.flightId);
//     }
//   }, []);

//   // Fetch available seats for the flight
//   const fetchAvailableSeats = async (flightId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/seats/available?flightId=${flightId}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setAvailableSeats(data);
//       } else {
//         console.error("Error fetching available seats");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Retrieve Passenger Info by Email
//   const handleRetrieveInfo = async () => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const response = await fetch(
//         `http://localhost:8080/booking/getByEmail?email=${email}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setPassport(data.passport || "");
//         setDateOfBirth(
//           data.dateOfBirth
//             ? new Date(data.dateOfBirth).toISOString().split("T")[0]
//             : ""
//         );
//         setGender(data.gender || "Male");
//         setContactDetails(data.contactDetails || "");
//       } else {
//         setApiError("Passenger not found.");
//       }
//     } catch (error) {
//       setApiError("Error retrieving passenger info.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormError("");

//     if (!firstName || !lastName || !passport || !contactDetails || !seatId) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }

//     // Redirect to the payment page
//     navigate(
//       `/payment?email=${email}&amount=${amount}&flightId=${flightId}&seatId=${seatId}`
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2>Passenger Information</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="button" onClick={handleRetrieveInfo} disabled={loading}>
//             {loading ? "Loading..." : "Retrieve Info"}
//           </button>
//         </div>

//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Passport:</label>
//           <input
//             type="text"
//             value={passport}
//             onChange={(e) => setPassport(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             value={dateOfBirth}
//             onChange={(e) => setDateOfBirth(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Gender:</label>
//           <select value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Contact Details:</label>
//           <input
//             type="text"
//             value={contactDetails}
//             onChange={(e) => setContactDetails(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Amount:</label>
//           <input type="number" value={amount} readOnly />
//         </div>

//         <div className="form-group">
//           <label>Choose a Seat:</label>
//           <select
//             value={seatId}
//             onChange={(e) => setSeatId(e.target.value)}
//             required
//           >
//             <option value="">Select Seat</option>
//             {availableSeats.map((seat) => (
//               <option key={seat.seatId} value={seat.seatId}>
//                 {seat.seatNumber} ({seat.classType})
//               </option>
//             ))}
//           </select>
//         </div>

//         {formError && <div className="error-message">{formError}</div>}
//         {apiError && <div className="error-message">{apiError}</div>}

//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PassengerForm;

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
