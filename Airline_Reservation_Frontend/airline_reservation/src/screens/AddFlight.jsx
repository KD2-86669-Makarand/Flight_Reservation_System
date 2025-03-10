// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminNavbar from "../Components/AdminNavbar";

// const AddFlights = () => {
//   const [flights, setFlights] = useState([]);
//   const [airlines, setAirlines] = useState([]);
//   const [aircraft, setAircraft] = useState([]);
//   const [airports, setAirports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [newFlight, setNewFlight] = useState({
//     airlineId: "",
//     aircraftId: "",
//     sourceId: "",
//     destinationId: "",
//     departureTime: "",
//     arrivalTime: "",
//     distance: "",
//     price: "",
//   });

//   // ✅ Fetch Data when the page loads
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [flightsRes, airlinesRes, aircraftRes, airportsRes] =
//           await Promise.all([
//             axios.get("http://localhost:8080/flight/getAllFlights"),
//             axios.get("http://localhost:8080/flight/getAllAirline"),
//             axios.get("http://localhost:8080/flight/getAllAircraft"),
//             axios.get("http://localhost:8080/flight/getAllAirport"),
//           ]);

//         setFlights(flightsRes.data);
//         setAirlines(airlinesRes.data);
//         setAircraft(aircraftRes.data);
//         setAirports(airportsRes.data);
//       } catch (error) {
//         console.error("Error fetching data!", error);
//         setError("Failed to load data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Handle Form Input Changes
//   const handleChange = (e) => {
//     setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting Flight Data:", newFlight);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/flight/addFlight",
//         newFlight
//       );
//       alert(response.data.message);

//       // ✅ Refresh flight list after adding
//       const updatedFlights = await axios.get(
//         "http://localhost:8080/flight/getAllFlights"
//       );
//       setFlights(updatedFlights.data);

//       setNewFlight({
//         airlineId: "",
//         aircraftId: "",
//         sourceId: "",
//         destinationId: "",
//         departureTime: "",
//         arrivalTime: "",
//         distance: "",
//         price: "",
//       });
//     } catch (error) {
//       console.error("Error adding flight!", error);
//       alert("Failed to add flight");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <header>
//         <div className="logo">
//           <a href="UserList">Users</a>
//         </div>
//         <AdminNavbar />
//       </header>

//       {/* 🔹 Display Flights Table */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Existing Flights
//       </h2>
//       {loading ? (
//         <p className="text-center text-blue-500">Loading data...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300 mb-8">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Flight ID</th>
//               <th className="border p-2">Airline</th>
//               <th className="border p-2">Aircraft</th>
//               <th className="border p-2">Source</th>
//               <th className="border p-2">Destination</th>
//               <th className="border p-2">Departure</th>
//               <th className="border p-2">Arrival</th>
//               <th className="border p-2">Duration</th>
//               <th className="border p-2">Distance</th>
//               <th className="border p-2">Price (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {flights.length > 0 ? (
//               flights.map((flight) => (
//                 <tr key={flight.flightId} className="text-center">
//                   <td className="border p-2">{flight.flightId}</td>
//                   <td className="border p-2">{flight.airlineName}</td>
//                   <td className="border p-2">{flight.aircraftModel}</td>
//                   <td className="border p-2">{flight.sourceAirportName}</td>
//                   <td className="border p-2">
//                     {flight.destinationAirportName}
//                   </td>
//                   <td className="border p-2">{flight.departureTime}</td>
//                   <td className="border p-2">{flight.arrivalTime}</td>
//                   <td className="border p-2">{flight.duration}</td>
//                   <td className="border p-2">{flight.distance} km</td>
//                   <td className="border p-2">₹{flight.price}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="10" className="text-center border p-2">
//                   No flights available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {/* 🔹 Add Flight Form Below the Table */}
//       <h2 className="text-2xl font-bold text-gray-800 mt-8">Add New Flight</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 bg-white p-6 shadow-md rounded-lg"
//       >
//         <label>Airline:</label>
//         <select
//           name="airlineId"
//           value={newFlight.airlineId}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//         >
//           <option value="">Select Airline</option>
//           {airlines.map((airline) => (
//             <option key={airline.airlineId} value={airline.airlineId}>
//               {airline.airlineName}
//             </option>
//           ))}
//         </select>

//         <label>Aircraft:</label>
//         <select
//           name="aircraft"
//           value={newFlight.aircraftId}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//         >
//           <option value="">Select Aircraft</option>
//           {aircraft.map((ac) => (
//             <option key={ac.aircraftId} value={ac.aircraftId}>
//               {ac.aircraftModel}
//             </option>
//           ))}
//         </select>

//         <label>Source Airport:</label>
//         <select
//           name="sourceId"
//           value={newFlight.sourceId}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//         >
//           <option value="">Select Source</option>
//           {airports.map((src) => (
//             <option key={src.airportId} value={src.airportId}>
//               {src.airportName}
//             </option>
//           ))}
//         </select>

//         <label>Destination Airport:</label>
//         <select
//           name="destinationId"
//           value={newFlight.destinationId}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//         >
//           <option value="">Select Destination</option>
//           {airports.map((dest) => (
//             <option key={dest.airportId} value={dest.airportId}>
//               {dest.airportName}
//             </option>
//           ))}
//         </select>

//         <label>Departure Time:</label>
//         <input
//           type="time"
//           name="departureTime"
//           value={newFlight.departureTime}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//           required
//         />

//         <label>Arrival Time:</label>
//         <input
//           type="time"
//           name="arrivalTime"
//           value={newFlight.arrivalTime}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//           required
//         />

//         <label>Distance (km):</label>
//         <input
//           type="number"
//           name="distance"
//           value={newFlight.distance}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//           required
//         />

//         <label>Price (₹):</label>
//         <input
//           type="number"
//           name="price"
//           value={newFlight.price}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//         >
//           Add Flight
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddFlights;

///////////////////////////////////////////////////////////////////////////////////////////////////
//This is the final and actual working code never ever delete this code otherwise you will be trouble !!!!!
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import AdminNavbar from "../Components/AdminNavbar";

// const FlightAdd = () => {
//   const [airlines, setAirlines] = useState([]);
//   const [aircrafts, setAircrafts] = useState([]);
//   const [filteredAircrafts, setFilteredAircrafts] = useState([]);
//   const [airports, setAirports] = useState([]);
//   const [flights, setFlights] = useState([]); // ✅ Store existing flights
//   const [newFlight, setNewFlight] = useState({
//     airlineId: "",
//     aircraftId: "",
//     sourceAirportId: "",
//     destinationAirportId: "",
//     distance: "",
//     departureTime: "",
//     arrivalTime: "",
//     isDirect: "",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/flight/getAllAirline")
//       .then((response) => setAirlines(response.data))
//       .catch((error) => console.error("Error fetching airlines!", error));

//     axios
//       .get("http://localhost:8080/flight/getAllAircraft")
//       .then((response) => setAircrafts(response.data))
//       .catch((error) => console.error("Error fetching aircrafts!", error));

//     axios
//       .get("http://localhost:8080/flight/getAllAirport")
//       .then((response) => setAirports(response.data))
//       .catch((error) => console.error("Error fetching airports!", error));

//     fetchFlights(); // ✅ Fetch existing flights when the page loads
//   }, []);

//   const fetchFlights = () => {
//     axios
//       .get("http://localhost:8080/flight/getAllFlights")
//       .then((response) => setFlights(response.data))
//       .catch((error) => console.error("Error fetching flights!", error));
//   };

//   useEffect(() => {
//     if (newFlight.airlineId) {
//       console.log("Filtering aircrafts for airlineId:", newFlight.airlineId);
//       console.log("Aircrafts from API:", aircrafts);
//       const filtered = aircrafts.filter(
//         (aircraft) => aircraft.airlineId === parseInt(newFlight.airlineId)
//       );
//       console.log("Filtered Aircrafts:", filtered); // ✅ Debugging line
//       setFilteredAircrafts(filtered);
//     } else {
//       setFilteredAircrafts([]);
//     }
//   }, [newFlight.airlineId, aircrafts]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewFlight((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAdd = () => {
//     if (
//       !newFlight.airlineId ||
//       !newFlight.aircraftId ||
//       !newFlight.sourceAirportId ||
//       !newFlight.destinationAirportId ||
//       !newFlight.distance ||
//       !newFlight.departureTime ||
//       !newFlight.arrivalTime
//     ) {
//       alert("Please fill all fields before adding a new flight.");
//       return;
//     }

//     const formattedFlight = {
//       ...newFlight,
//       distance: parseFloat(newFlight.distance),
//       // isDirect: true,
//     };

//     axios
//       .post("http://localhost:8080/flight/addFlight", formattedFlight)
//       .then(() => {
//         alert("Flight added successfully!");
//         fetchFlights(); // ✅ Refresh flight list after adding a flight
//         setNewFlight({
//           airlineId: "",
//           aircraftId: "",
//           sourceAirportId: "",
//           destinationAirportId: "",
//           distance: "",
//           departureTime: "",
//           arrivalTime: "",
//           isDirect: "",
//         });
//       })
//       .catch((error) => console.error("Error adding flight!", error));
//   };

//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <header>
//           <div class="logo">
//             <a href="UserList">Users</a>
//           </div>
//           <AdminNavbar />
//         </header>
//         {/* ✅ Table to Display Existing Flights */}
//         <h2>Existing Flights</h2>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Flight ID</th>
//               <th>Airline</th>
//               <th>Aircraft</th>
//               <th>Source</th>
//               <th>Destination</th>
//               <th>Departure</th>
//               <th>Arrival</th>
//               <th>Distance</th>
//               <th>Duration</th>
//               <th>Price</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {flights.length > 0 ? (
//               flights.map((flight) => (
//                 <tr key={flight.flightId}>
//                   <td>{flight.flightId}</td>
//                   <td>{flight.airlineName}</td>
//                   <td>{flight.aircraftModel}</td>
//                   <td>{flight.sourceAirportName}</td>
//                   <td>{flight.destinationAirportName}</td>
//                   <td>{flight.departureTime}</td>
//                   <td>{flight.arrivalTime}</td>
//                   <td>{flight.distance} km</td>
//                   <td>{flight.duration}</td>
//                   <td>₹{flight.price}</td>
//                   <td>{flight.direct ? "Direct" : "Connected"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="11">No flights available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <h2>Add New Flight</h2>
//         {/* <select
//           name="airlineId"
//           value={newFlight.airlineId}
//           onChange={handleChange}
//         >
//           <option value="">Select Airline</option>
//           {airlines.map((airline) => (
//             <option key={airline.airlineId} value={airline.airlineId}>
//               {airline.airlineName}
//             </option>
//           ))}
//         </select> */}

//         <select
//           name="airlineId"
//           value={newFlight.airlineId}
//           onChange={(e) =>
//             setNewFlight({ ...newFlight, airlineId: Number(e.target.value) })
//           }
//         >
//           <option value="">Select Airline</option>
//           {airlines.map((airline) => (
//             <option key={airline.airlineId} value={airline.airlineId}>
//               {airline.airlineName}
//             </option>
//           ))}
//         </select>

//         <select
//           name="aircraftId"
//           value={newFlight.aircraftId}
//           onChange={handleChange}
//           disabled={!newFlight.airlineId}
//         >
//           <option value="">Select Aircraft</option>
//           {filteredAircrafts.map((aircraft) => (
//             <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
//               {aircraft.aircraftModel}
//             </option>
//           ))}
//         </select>

//         {/* <select
//           name="sourceAirportId"
//           value={newFlight.sourceAirportId}
//           onChange={handleChange}
//         >
//           <option value="">Select Source Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select>

//         <select
//           name="destinationAirportId"
//           value={newFlight.destinationAirportId}
//           onChange={handleChange}
//         >
//           <option value="">Select Destination Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select> */}
//         <select
//           name="sourceId"
//           value={newFlight.sourceId}
//           onChange={handleChange}
//         >
//           <option value="">Select Source Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select>

//         <select
//           name="destinationId"
//           value={newFlight.destinationId}
//           onChange={handleChange}
//         >
//           <option value="">Select Destination Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           name="distance"
//           value={newFlight.distance}
//           onChange={handleChange}
//           placeholder="Distance (km)"
//         />

//         <input
//           type="number"
//           name="price"
//           value={newFlight.price}
//           onChange={handleChange}
//           placeholder="Price (₹)"
//         />
//         <input
//           type="datetime-local"
//           name="departureTime"
//           value={newFlight.departureTime}
//           onChange={handleChange}
//         />

//         <input
//           type="datetime-local"
//           name="arrivalTime"
//           value={newFlight.arrivalTime}
//           onChange={handleChange}
//         />

//         <select
//           name="isDirect"
//           value={newFlight.isDirect}
//           onChange={handleChange}
//         >
//           <option value="">Select Flight Type</option>
//           <option value="Direct">Direct</option>
//           <option value="Connected">Connected</option>
//         </select>

//         <input type="text" value="Direct" readOnly disabled />

//         <button onClick={handleAdd}>Add Flight</button>
//       </div>
//     </div>
//   );
// };

// export default FlightAdd;
/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FlightAdd = () => {
//   const [airlines, setAirlines] = useState([]);
//   const [aircrafts, setAircrafts] = useState([]);
//   const [filteredAircrafts, setFilteredAircrafts] = useState([]); // ✅ Store filtered aircrafts
//   const [airports, setAirports] = useState([]);
//   const [flights, setFlights] = useState([]);
//   const [newFlight, setNewFlight] = useState({
//     airlineId: "",
//     aircraftId: "",
//     sourceId: "",
//     destinationId: "",
//     distance: "",
//     departureTime: "",
//     arrivalTime: "",
//     isDirect: "true",
//   });

//   // ✅ Fetch Airlines, Aircrafts, and Airports on Page Load
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/flight/getAllAirline")
//       .then((response) => setAirlines(response.data))
//       .catch((error) => console.error("Error fetching airlines!", error));

//     axios
//       .get("http://localhost:8080/flight/getAllAircraft")
//       .then((response) => setAircrafts(response.data))
//       .catch((error) => console.error("Error fetching aircrafts!", error));

//     axios
//       .get("http://localhost:8080/flight/getAllAirport")
//       .then((response) => setAirports(response.data))
//       .catch((error) => console.error("Error fetching airports!", error));
//   }, []);

//   // ✅ Update filtered aircrafts when airline changes
//   useEffect(() => {
//     if (newFlight.airlineId) {
//       const filtered = aircrafts.filter(
//         (aircraft) => aircraft.airlineId === parseInt(newFlight.airlineId) // ✅ Filtering aircrafts by airlineId
//       );
//       setFilteredAircrafts(filtered);
//     } else {
//       setFilteredAircrafts([]);
//     }
//   }, [newFlight.airlineId, aircrafts]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewFlight((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAdd = () => {
//     if (
//       !newFlight.airlineId ||
//       !newFlight.aircraftId ||
//       !newFlight.sourceId ||
//       !newFlight.destinationId ||
//       !newFlight.distance ||
//       !newFlight.departureTime ||
//       !newFlight.arrivalTime
//     ) {
//       alert("Please fill all fields before adding a new flight.");
//       return;
//     }

//     const formattedFlight = {
//       ...newFlight,
//       distance: parseFloat(newFlight.distance),
//       isDirect: true,
//     };

//     axios
//       .post("http://localhost:8080/flight/addFlight", formattedFlight)
//       .then(() => {
//         alert("Flight added successfully!");
//         setNewFlight({
//           airlineId: "",
//           aircraftId: "",
//           sourceId: "",
//           destinationId: "",
//           distance: "",
//           departureTime: "",
//           arrivalTime: "",
//           isDirect: "true",
//         });
//       })
//       .catch((error) => console.error("Error adding flight!", error));
//   };

//   return (
//     <div>
//       <h2>Add New Flight</h2>

//       {/* ✅ Select Airline */}
//       <select
//         name="airlineId"
//         value={newFlight.airlineId}
//         onChange={handleChange}
//       >
//         <option value="">Select Airline</option>
//         {airlines.map((airline) => (
//           <option key={airline.airlineId} value={airline.airlineId}>
//             {airline.airlineName}
//           </option>
//         ))}
//       </select>

//       {/* ✅ Select Aircraft (Filtered by Airline) */}
//       <select
//         name="aircraftId"
//         value={newFlight.aircraftId}
//         onChange={handleChange}
//         disabled={!newFlight.airlineId}
//       >
//         <option value="">Select Aircraft</option>
//         {filteredAircrafts.map((aircraft) => (
//           <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
//             {aircraft.aircraftModel}
//           </option>
//         ))}
//       </select>

//       {/* ✅ Select Source Airport */}
//       <select
//         name="sourceId"
//         value={newFlight.sourceId}
//         onChange={handleChange}
//       >
//         <option value="">Select Source Airport</option>
//         {airports.map((airport) => (
//           <option key={airport.airportId} value={airport.airportId}>
//             {airport.airportName}
//           </option>
//         ))}
//       </select>

//       {/* ✅ Select Destination Airport */}
//       <select
//         name="destinationId"
//         value={newFlight.destinationId}
//         onChange={handleChange}
//       >
//         <option value="">Select Destination Airport</option>
//         {airports.map((airport) => (
//           <option key={airport.airportId} value={airport.airportId}>
//             {airport.airportName}
//           </option>
//         ))}
//       </select>

//       {/* ✅ Distance */}
//       <input
//         type="number"
//         name="distance"
//         value={newFlight.distance}
//         onChange={handleChange}
//         placeholder="Distance (km)"
//       />

//       {/* ✅ Departure Time */}
//       <input
//         type="datetime-local"
//         name="departureTime"
//         value={newFlight.departureTime}
//         onChange={handleChange}
//       />

//       {/* ✅ Arrival Time */}
//       <input
//         type="datetime-local"
//         name="arrivalTime"
//         value={newFlight.arrivalTime}
//         onChange={handleChange}
//       />

//       {/* ✅ Flight Type (Always Direct) */}
//       <input type="text" value="Direct" />

//       {/* ✅ Submit Button */}
//       <button onClick={handleAdd}>Add Flight</button>
//     </div>
//   );
// };

// export default FlightAdd;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminNavbar from "../Components/AdminNavbar";

// const FlightAdd = () => {
//   const [airlines, setAirlines] = useState([]);
//   const [aircrafts, setAircrafts] = useState([]);
//   const [filteredAircrafts, setFilteredAircrafts] = useState([]); // ✅ Store filtered aircrafts
//   const [airports, setAirports] = useState([]);
//   const [newFlight, setNewFlight] = useState({
//     airlineId: "",
//     aircraftId: "",
//     sourceId: "",
//     destinationId: "",
//     distance: "",
//     departureTime: "",
//     arrivalTime: "",
//     isDirect: "true",
//     price: "",
//   });

//   // ✅ Fetch Airlines and Airports on Page Load
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/flight/getAllAirline")
//       .then((response) => setAirlines(response.data))
//       .catch((error) => console.error("Error fetching airlines!", error));

//     axios
//       .get("http://localhost:8080/flight/getAllAirport")
//       .then((response) => setAirports(response.data))
//       .catch((error) => console.error("Error fetching airports!", error));
//   }, []);

//   // ✅ Fetch Aircrafts when Airline is Selected
//   useEffect(() => {
//     if (newFlight.airlineId) {
//       axios
//         .get(`http://localhost:8080/flight/getAllAircraft`) // ✅ Fetch all aircrafts
//         .then((response) => {
//           const filtered = response.data.filter(
//             (aircraft) => aircraft.airlineId === parseInt(newFlight.airlineId) // ✅ Filter aircrafts by airlineId
//           );
//           setFilteredAircrafts(filtered);
//         })
//         .catch((error) => console.error("Error fetching aircrafts!", error));
//     } else {
//       setFilteredAircrafts([]); // ✅ Reset if no airline selected
//     }
//   }, [newFlight.airlineId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewFlight((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAdd = () => {
//     if (
//       !newFlight.airlineId ||
//       !newFlight.aircraftId ||
//       !newFlight.sourceId ||
//       !newFlight.destinationId ||
//       !newFlight.distance ||
//       !newFlight.departureTime ||
//       !newFlight.arrivalTime ||
//       !newFlight.price
//     ) {
//       alert("Please fill all fields before adding a new flight.");
//       return;
//     }

//     const formattedFlight = {
//       ...newFlight,
//       distance: parseFloat(newFlight.distance),
//       isDirect: true,
//       price: parseFloat(newFlight.price),
//     };

//     axios
//       .post("http://localhost:8080/flight/addFlight", formattedFlight)
//       .then(() => {
//         alert("Flight added successfully!");
//         setNewFlight({
//           airlineId: "",
//           aircraftId: "",
//           sourceId: "",
//           destinationId: "",
//           distance: "",
//           departureTime: "",
//           arrivalTime: "",
//           isDirect: "true",
//           price: "",
//         });
//       })
//       .catch((error) => console.error("Error adding flight!", error));
//   };

//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <header>
//           <div class="logo">
//             <a href="UserList">Users</a>
//           </div>
//           <AdminNavbar />
//         </header>

//         <h2>Add New Flight</h2>

//         {/* ✅ Select Airline */}
//         <select
//           name="airlineId"
//           value={newFlight.airlineId}
//           onChange={handleChange}
//         >
//           <option value="">Select Airline</option>
//           {airlines.map((airline) => (
//             <option key={airline.airlineId} value={airline.airlineId}>
//               {airline.airlineName}
//             </option>
//           ))}
//         </select>

//         {/* ✅ Select Aircraft (Filtered by Airline) */}
//         <select
//           name="aircraftId"
//           value={newFlight.aircraftId}
//           onChange={handleChange}
//           disabled={!newFlight.airlineId}
//         >
//           <option value="">Select Aircraft</option>
//           {filteredAircrafts.map((aircraft) => (
//             <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
//               {aircraft.aircraftModel}
//             </option>
//           ))}
//         </select>

//         {/* ✅ Select Source Airport */}
//         <select
//           name="sourceId"
//           value={newFlight.sourceId}
//           onChange={handleChange}
//         >
//           <option value="">Select Source Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select>

//         {/* ✅ Select Destination Airport */}
//         <select
//           name="destinationId"
//           value={newFlight.destinationId}
//           onChange={handleChange}
//         >
//           <option value="">Select Destination Airport</option>
//           {airports.map((airport) => (
//             <option key={airport.airportId} value={airport.airportId}>
//               {airport.airportName}
//             </option>
//           ))}
//         </select>

//         {/* ✅ Distance */}
//         <input
//           type="number"
//           name="distance"
//           value={newFlight.distance}
//           onChange={handleChange}
//           placeholder="Distance (km)"
//         />

//         {/* ✅ Departure Time */}
//         <input
//           type="datetime-local"
//           name="departureTime"
//           value={newFlight.departureTime}
//           onChange={handleChange}
//         />

//         {/* ✅ Arrival Time */}
//         <input
//           type="datetime-local"
//           name="arrivalTime"
//           value={newFlight.arrivalTime}
//           onChange={handleChange}
//         />

//         {/* ✅ Price */}
//         <input
//           type="number"
//           name="price"
//           value={newFlight.price}
//           onChange={handleChange}
//           placeholder="Price (₹)"
//           step="0.01"
//         />

//         {/* ✅ Flight Type (Always Direct) */}
//         <input type="text" value="Direct" readOnly disabled />

//         {/* ✅ Submit Button */}
//         <button onClick={handleAdd}>Add Flight</button>
//       </div>
//     </div>
//   );
// };

// export default FlightAdd;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";
// import "./AddFlight.css";

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
            <a href="UserList">Users</a>
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
