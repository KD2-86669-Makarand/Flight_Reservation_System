// // //  D:\AIRLINE_RESERVATION_SYSTEM\pics\SEARCHFLIGHT.drawio - Copy.png

// import React from "react";
// import "./AvailableFlights.css"; // Optional custom CSS file

// const AvailableFlights = () => {
//   const flights = [
//     {
//       id: 1,
//       date: "12 JAN 2025",
//       departure: "Kolhapur (KHL)",
//       depTime: "11:00 AM",
//       arrival: "Mumbai (BOM)",
//       arrTime: "1:20 PM",
//       type: "nonstop",
//       price: "₹12,000",
//       class: "Business",
//     },
//     {
//       id: 2,
//       date: "12 JAN 2025",
//       departure: "Kolhapur (KHL)",
//       depTime: "4:00 PM",
//       arrival: "Mumbai (BOM)",
//       arrTime: "6:50 PM",
//       type: "nonstop",
//       price: "₹9,300",
//       class: "Business",
//     },
//     {
//       id: 3,
//       date: "12 JAN 2025",
//       departure: "Kolhapur (KHL)",
//       depTime: "8:45 PM",
//       arrival: "Mumbai (BOM)",
//       arrTime: "11:30 PM",
//       type: "nonstop",
//       price: "₹11,000",
//       class: "Business",
//     },
//   ];

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Available Flights</h2>
//       <div className="list-group">
//         {flights.map((flight) => (
//           <div key={flight.id} className="list-group-item shadow mb-3">
//             <div className="row align-items-center">
//               <div className="col-md-3 text-center">
//                 <h5>{flight.date}</h5>
//                 <p className="text-muted">{flight.class}</p>
//               </div>
//               <div className="col-md-6">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6>{flight.departure}</h6>
//                     <p>{flight.depTime}</p>
//                   </div>
//                   <div>
//                     <i className="bi bi-arrow-right fs-4"></i>
//                   </div>
//                   <div>
//                     <h6>{flight.arrival}</h6>
//                     <p>{flight.arrTime}</p>
//                   </div>
//                 </div>
//                 <p className="text-muted text-center">{flight.type}</p>
//               </div>
//               <div className="col-md-3 text-center">
//                 <h5>{flight.price}</h5>
//                 <button className="btn btn-primary btn-sm">Book Now</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableFlights;

// //--------------------------------------------------------------------------
// // import React from "react";

// // const AvailableFlights = () => {
// //   const flights = [
// //     { date: "12 JAN 2025", time: "11:00 AM", price: "12,000" },
// //     { date: "12 JAN 2025", time: "04:00 PM", price: "9,300" },
// //     { date: "12 JAN 2025", time: "08:45 PM", price: "11,000" },
// //   ];

// //   return (
// //     <div>
// //       <h2>Available Flights</h2>
// //       <div>
// //         {flights.map((flight, index) => (
// //           <div
// //             key={index}
// //             style={{
// //               border: "1px solid #ccc",
// //               margin: "10px",
// //               padding: "10px",
// //             }}
// //           >
// //             <p>{flight.date}</p>
// //             <p>{flight.time}</p>
// //             <p>Price: INR {flight.price}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AvailableFlights;
// ///----------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./AvailableFlights.css"; // Optional custom CSS file

// const AvailableFlights = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const sourceId = searchParams.get("source");
//   const destinationId = searchParams.get("destination");
//   const travelDate = searchParams.get("date");

//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     if (sourceId && destinationId && travelDate) {
//       fetchFlights();
//     }
//   }, [sourceId, destinationId, travelDate]);

//   const fetchFlights = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/flight/searchFlights?sourceId=${sourceId}&destinationId=${destinationId}&travelDate=${travelDate}`
//       );
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error fetching available flights!", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Available Flights</h2>
//       {flights.length > 0 ? (
//         <div className="list-group">
//           {flights.map((flight) => (
//             <div key={flight.flightId} className="list-group-item shadow mb-3">
//               <div className="row align-items-center">
//                 <div className="col-md-3 text-center">
//                   <h5>{travelDate}</h5>
//                   <p className="text-muted">{flight.class || "Economy"}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6>{flight.sourceAirportName}</h6>
//                       <p>{flight.departureTime}</p>
//                     </div>
//                     <div>
//                       <i className="bi bi-arrow-right fs-4"></i>
//                     </div>
//                     <div>
//                       <h6>{flight.destinationAirportName}</h6>
//                       <p>{flight.arrivalTime}</p>
//                     </div>
//                   </div>
//                   <p className="text-muted text-center">
//                     {flight.direct ? "Nonstop" : "Connected"}
//                   </p>
//                 </div>
//                 <div className="col-md-3 text-center">
//                   <h5>₹{flight.price}</h5>
//                   <button className="btn btn-primary btn-sm">Book Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h5 className="text-center text-muted">
//           No flights available for this route on {travelDate}
//         </h5>
//       )}
//     </div>
//   );
// };

// export default AvailableFlights;

////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./AvailableFlights.css"; // Optional custom CSS file

// const AvailableFlights = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   // ✅ Extract search parameters (from the search form)
//   const sourceId = searchParams.get("source");
//   const destinationId = searchParams.get("destination");
//   const selectedDate = searchParams.get("date"); // 📌 Selected travel date

//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (sourceId && destinationId) {
//       fetchFlights();
//     }
//   }, [sourceId, destinationId, selectedDate]);

//   const fetchFlights = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `http://localhost:8080/flight/searchFlights`,
//         {
//           params: { sourceId, destinationId },
//         }
//       );

//       console.log("API Response:", response.data); // ✅ Debugging
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error fetching available flights:", error);
//       setError("Failed to fetch flights. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Available Flights</h2>

//       {/* ✅ Show loading state */}
//       {loading && (
//         <h5 className="text-center text-muted">Loading flights...</h5>
//       )}

//       {/* ✅ Show error message if API fails */}
//       {error && <h5 className="text-center text-danger">{error}</h5>}

//       {/* ✅ Display flights */}
//       {!loading && flights.length > 0 ? (
//         <div className="list-group">
//           {flights.map((flight) => {
//             // ✅ Check if flight matches selected date
//             const isMatchingDate = selectedDate === flight.departureDate;

//             return (
//               <div
//                 key={flight.flightId}
//                 className={`list-group-item shadow mb-3 ${
//                   isMatchingDate ? "border border-primary" : ""
//                 }`}
//               >
//                 <div className="row align-items-center">
//                   <div className="col-md-3 text-center">
//                     <h5 className={isMatchingDate ? "text-primary" : ""}>
//                       {flight.departureDate}
//                     </h5>
//                     <p className="text-muted">{flight.class || "Economy"}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6>{flight.sourceAirportName}</h6>
//                         <p>{flight.departureTime}</p>
//                       </div>
//                       <div>
//                         <i className="bi bi-arrow-right fs-4"></i>
//                       </div>
//                       <div>
//                         <h6>{flight.destinationAirportName}</h6>
//                         <p>{flight.arrivalTime}</p>
//                       </div>
//                     </div>
//                     <p className="text-muted text-center">
//                       {flight.direct ? "Nonstop" : "Connected"}
//                     </p>
//                   </div>
//                   <div className="col-md-3 text-center">
//                     <h5>₹{flight.price}</h5>
//                     <button className="btn btn-primary btn-sm">Book Now</button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         !loading && (
//           <h5 className="text-center text-muted">
//             No flights available for this route
//           </h5>
//         )
//       )}
//     </div>
//   );
// };

// export default AvailableFlights;

///////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./AvailableFlights.css"; // Custom CSS file

// const AvailableFlights = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const sourceId = searchParams.get("source");
//   const destinationId = searchParams.get("destination");
//   const travelDate = searchParams.get("date"); // ✅ Get the date

//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (sourceId && destinationId && travelDate) {
//       fetchFlights();
//     }
//   }, [sourceId, destinationId, travelDate]);

//   const fetchFlights = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/flight/searchFlights?sourceId=${sourceId}&destinationId=${destinationId}&travelDate=${travelDate}`
//       );
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error fetching available flights!", error);
//       setFlights([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Available Flights</h2>
//       {loading ? (
//         <h5 className="text-center text-muted">Loading flights...</h5>
//       ) : flights.length > 0 ? (
//         <div className="list-group">
//           {flights.map((flight) => (
//             <div key={flight.flightId} className="list-group-item shadow mb-3">
//               <div className="row align-items-center">
//                 <div className="col-md-3 text-center">
//                   <h5>{travelDate}</h5>
//                   <p className="text-muted">{flight.class || "Economy"}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6>{flight.sourceAirportName}</h6>
//                       <p>{flight.departureTime}</p>
//                     </div>
//                     <div>
//                       <i className="bi bi-arrow-right fs-4"></i>
//                     </div>
//                     <div>
//                       <h6>{flight.destinationAirportName}</h6>
//                       <p>{flight.arrivalTime}</p>
//                     </div>
//                   </div>
//                   <p className="text-muted text-center">
//                     {flight.direct ? "Nonstop" : "Connected"}
//                   </p>
//                 </div>
//                 <div className="col-md-3 text-center">
//                   <h5>₹{flight.price}</h5>
//                   <button className="btn btn-primary btn-sm">Book Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h5 className="text-center text-muted">
//           No flights available for this route on {travelDate}
//         </h5>
//       )}
//     </div>
//   );
// };

// export default AvailableFlights;

//////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./AvailableFlights.css"; // Custom CSS

// const AvailableFlights = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const sourceId = searchParams.get("source");
//   const destinationId = searchParams.get("destination");
//   const travelDate = searchParams.get("date");

//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Available Flights based on User Selection
//   useEffect(() => {
//     if (sourceId && destinationId && travelDate) {
//       fetchFlights();
//     }
//   }, [sourceId, destinationId, travelDate]);

//   const fetchFlights = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/flight/searchFlights?sourceId=${sourceId}&destinationId=${destinationId}&travelDate=${travelDate}`
//       );
//       setFlights(response.data);
//     } catch (error) {
//       console.error("Error fetching available flights!", error);
//       setFlights([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Available Flights</h2>
//       {loading ? (
//         <h5 className="text-center text-muted">Loading flights...</h5>
//       ) : flights.length > 0 ? (
//         <div className="list-group">
//           {flights.map((flight) => (
//             <div key={flight.flightId} className="list-group-item shadow mb-3">
//               <div className="row align-items-center">
//                 <div className="col-md-3 text-center">
//                   <h5>{travelDate}</h5>
//                   <p className="text-muted">{flight.class || "Economy"}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <h6>{flight.sourceAirportName}</h6>
//                       <p>{flight.departureTime}</p>
//                     </div>
//                     <div>
//                       <i className="bi bi-arrow-right fs-4"></i>
//                     </div>
//                     <div>
//                       <h6>{flight.destinationAirportName}</h6>
//                       <p>{flight.arrivalTime}</p>
//                     </div>
//                   </div>
//                   <p className="text-muted text-center">
//                     {flight.direct ? "Nonstop" : "Connected"}
//                   </p>
//                 </div>
//                 <div className="col-md-3 text-center">
//                   <h5>₹{flight.price}</h5>
//                   <button className="btn btn-primary btn-sm">Book Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h5 className="text-center text-muted">
//           No flights available for this route on {travelDate}
//         </h5>
//       )}
//     </div>
//   );
// };

// export default AvailableFlights;
/////////////////////////////////////////////////////////////////////////////\

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Do not delete this code
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// // import "./FlightResults.css"; // You'll need to create this CSS file

// const FlightResults = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [flights, setFlights] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchParams, setSearchParams] = useState({});

//   useEffect(() => {
//     // Get query parameters from URL
//     const queryParams = new URLSearchParams(location.search);
//     const sourceId = queryParams.get("sourceId");
//     const destinationId = queryParams.get("destinationId");
//     const departureDate = queryParams.get("departureDate");

//     // Store params for potential use in UI
//     setSearchParams({
//       sourceId,
//       destinationId,
//       departureDate,
//     });

//     // Validate required parameters
//     if (!sourceId || !destinationId || !departureDate) {
//       navigate("/search-flight"); // Redirect back to search if missing params
//       return;
//     }

//     // Fetch flight results
//     axios
//       .get("http://localhost:8080/flight/search", {
//         params: {
//           sourceId,
//           destinationId,
//           departureDate,
//         },
//       })
//       .then((response) => {
//         setFlights(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error searching flights!", error);
//         setFlights([]);
//         setIsLoading(false);
//       });
//   }, [location.search, navigate]);

//   // Format time for display (assuming format is "dd-MM-yyyy HH:mm")
//   const formatTime = (dateTimeString) => {
//     if (!dateTimeString) return "-";
//     const parts = dateTimeString.split(" ");
//     return parts.length > 1 ? parts[1] : dateTimeString;
//   };

//   // Format date for display (assuming format is "dd-MM-yyyy HH:mm")
//   const formatDate = (dateTimeString) => {
//     if (!dateTimeString) return "-";
//     const parts = dateTimeString.split(" ");
//     return parts.length > 0 ? parts[0] : dateTimeString;
//   };

//   // Handle back to search
//   const handleBackToSearch = () => {
//     navigate("/SearchFlight");
//   };

//   const handleBooking = () => {
//     navigate("/BookSeat");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flight-results-container">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2>Flight Search Results</h2>
//           <button
//             className="btn btn-outline-secondary"
//             onClick={handleBackToSearch}
//           >
//             Back to Search
//           </button>
//         </div>

//         {isLoading ? (
//           <div className="text-center p-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Searching for flights...</p>
//           </div>
//         ) : flights.length > 0 ? (
//           <div className="flight-results">
//             {flights.map((flight) => (
//               <div key={flight.flightId} className="card mb-3 flight-card">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-3">
//                       <h5 className="airline-name">{flight.airlineName}</h5>
//                       <p className="text-muted">{flight.aircraftModel}</p>
//                     </div>
//                     <div className="col-md-3">
//                       <div className="departure-info">
//                         <h5>{formatTime(flight.departureTime)}</h5>
//                         <p className="airport-name">
//                           {flight.sourceAirportName}
//                         </p>
//                         <small>{formatDate(flight.departureTime)}</small>
//                       </div>
//                     </div>
//                     <div className="col-md-2 flight-duration">
//                       <div className="duration-display">
//                         <div className="duration-time">{flight.duration}</div>
//                         <div className="flight-line">
//                           <div className="flight-dot"></div>
//                           <div className="flight-route"></div>
//                           <div className="flight-dot"></div>
//                         </div>
//                         <div className="small text-center">
//                           {flight.isDirect ? "Direct" : "Direct"}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-2">
//                       <div className="arrival-info">
//                         <h5>{formatTime(flight.arrivalTime)}</h5>
//                         <p className="airport-name">
//                           {flight.destinationAirportName}
//                         </p>
//                         <small>{formatDate(flight.arrivalTime)}</small>
//                       </div>
//                     </div>
//                     <div className="col-md-2 price-section">
//                       <div className="price">
//                         ₹{flight.price.toLocaleString()}
//                       </div>
//                       <button
//                         className="btn btn-primary btn-sm mt-2"
//                         onClick={handleBooking}
//                       >
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="alert alert-info">
//             No flights available for the selected route and date. Please try
//             different search criteria.
//             <button className="btn btn-link" onClick={handleBackToSearch}>
//               Modify Search
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightResults;
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const FlightResults = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [flights, setFlights] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchParams, setSearchParams] = useState({});

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const sourceId = queryParams.get("sourceId");
//     const destinationId = queryParams.get("destinationId");
//     const departureDate = queryParams.get("departureDate");

//     setSearchParams({ sourceId, destinationId, departureDate });

//     if (!sourceId || !destinationId || !departureDate) {
//       navigate("/search-flight");
//       return;
//     }

//     axios
//       .get("http://localhost:8080/flight/search", {
//         params: { sourceId, destinationId, departureDate },
//       })
//       .then((response) => {
//         setFlights(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error searching flights!", error);
//         setFlights([]);
//         setIsLoading(false);
//       });
//   }, [location.search, navigate]);

//   const formatTime = (dateTimeString) => dateTimeString?.split(" ")[1] || "-";
//   const formatDate = (dateTimeString) => dateTimeString?.split(" ")[0] || "-";

//   const handleBackToSearch = () => navigate("/SearchFlight");

//   // ✅ Pass Flight ID for Booking
//   const handleBooking = (flightId) => {
//     navigate(`/BookSeat?flightId=${flightId}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flight-results-container">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2>Flight Search Results</h2>
//           <button
//             className="btn btn-outline-secondary"
//             onClick={handleBackToSearch}
//           >
//             Back to Search
//           </button>
//         </div>

//         {isLoading ? (
//           <div className="text-center p-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Searching for flights...</p>
//           </div>
//         ) : flights.length > 0 ? (
//           <div className="flight-results">
//             {flights.map((flight) => (
//               <div key={flight.flightId} className="card mb-3 flight-card">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-3">
//                       <h5 className="airline-name">{flight.airlineName}</h5>
//                       <p className="text-muted">{flight.aircraftModel}</p>
//                     </div>
//                     <div className="col-md-3">
//                       <div className="departure-info">
//                         <h5>{formatTime(flight.departureTime)}</h5>
//                         <p className="airport-name">
//                           {flight.sourceAirportName}
//                         </p>
//                         <small>{formatDate(flight.departureTime)}</small>
//                       </div>
//                     </div>
//                     <div className="col-md-2 flight-duration">
//                       <div className="duration-display">
//                         <div className="duration-time">{flight.duration}</div>
//                         <div className="flight-line">
//                           <div className="flight-dot"></div>
//                           <div className="flight-route"></div>
//                           <div className="flight-dot"></div>
//                         </div>
//                         <div className="small text-center">
//                           {flight.isDirect ? "Direct" : "Connected"}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-2">
//                       <div className="arrival-info">
//                         <h5>{formatTime(flight.arrivalTime)}</h5>
//                         <p className="airport-name">
//                           {flight.destinationAirportName}
//                         </p>
//                         <small>{formatDate(flight.arrivalTime)}</small>
//                       </div>
//                     </div>
//                     <div className="col-md-2 price-section">
//                       <div className="price">
//                         ₹{flight.price.toLocaleString()}
//                       </div>
//                       <button
//                         className="btn btn-primary btn-sm mt-2"
//                         onClick={() => handleBooking(flight.flightId)}
//                       >
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="alert alert-info">
//             No flights available for the selected route and date. Please try
//             different search criteria.
//             <button className="btn btn-link" onClick={handleBackToSearch}>
//               Modify Search
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightResults;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FlightResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sourceId = queryParams.get("sourceId");
    const destinationId = queryParams.get("destinationId");
    const departureDate = queryParams.get("departureDate");

    setSearchParams({ sourceId, destinationId, departureDate });

    if (!sourceId || !destinationId || !departureDate) {
      navigate("/AvailableFlights");
      return;
    }

    axios
      .get("http://localhost:8080/flight/search", {
        params: { sourceId, destinationId, departureDate },
      })
      .then((response) => {
        setFlights(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error searching flights!", error);
        setFlights([]);
        setIsLoading(false);
      });
  }, [location.search, navigate]);

  const formatTime = (dateTimeString) => dateTimeString?.split(" ")[1] || "-";
  const formatDate = (dateTimeString) => dateTimeString?.split(" ")[0] || "-";

  const handleBackToSearch = () => navigate("/SearchFlight");

  // ✅ Pass Flight ID for Booking
  const handleBooking = (flight) => {
    navigate(`/BookSeat?flightId=${flight.flightId}`);
    sessionStorage.setItem(
      "selectedFlight",
      JSON.stringify({
        flightId: flight.flightId,
        aircraftId: flight.aircraftId,
        amount: flight.price,
        date: flight.departureTime,
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flight-results-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Flight Search Results</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={handleBackToSearch}
          >
            Back to Search
          </button>
        </div>

        {isLoading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Searching for flights...</p>
          </div>
        ) : flights.length > 0 ? (
          <div className="flight-results">
            {flights.map((flight) => (
              <div key={flight.flightId} className="card mb-3 flight-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <h5 className="airline-name">{flight.airlineName}</h5>
                      <p className="text-muted">{flight.aircraftModel}</p>
                      <p>Aircraft ID: {flight.aircraftId || "Not Available"}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="departure-info">
                        <h5>{formatTime(flight.departureTime)}</h5>
                        <p className="airport-name">
                          {flight.sourceAirportName}
                        </p>
                        <small>{formatDate(flight.departureTime)}</small>
                      </div>
                    </div>
                    <div className="col-md-2 flight-duration">
                      <div className="duration-display">
                        <div className="duration-time">{flight.duration}</div>
                        <div className="flight-line">
                          <div className="flight-dot"></div>
                          <div className="flight-route"></div>
                          <div className="flight-dot"></div>
                        </div>
                        <div className="small text-center">
                          {flight.isDirect ? "Direct" : "Connected"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="arrival-info">
                        <h5>{formatTime(flight.arrivalTime)}</h5>
                        <p className="airport-name">
                          {flight.destinationAirportName}
                        </p>
                        <small>{formatDate(flight.arrivalTime)}</small>
                      </div>
                    </div>
                    <div className="col-md-2 price-section">
                      <div className="price">
                        ₹{flight.price.toLocaleString()}
                      </div>
                      <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={() => handleBooking(flight)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            No flights available for the selected route and date. Please try
            different search criteria.
            <button className="btn btn-link" onClick={handleBackToSearch}>
              Modify Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
