// // "D:\AIRLINE_RESERVATION_SYSTEM\pics\SEARCHFLIGHT.drawio - Copy.png"

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./SearchFlight.css"; // Import custom CSS file

// const SearchFlight = () => {
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate("/available-flights"); // Navigate to Available Flights page
//   };

//   return (
//     <div className="container mt-5">
//       <form>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Departure</label>
//             <select className="form-select">
//               <option>Kolhapur (KLH)</option>
//               <option>Mumbai (BOM)</option>
//               <option>Pune (PUQ)</option>
//               <option>Belgavi (IXG)</option>
//               <option>Bengaluru (BLR)</option>
//               <option>Bhopal (BHO)</option>
//               <option>Chennai(MAA)</option>
//               <option>Delhi (DEL)</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Arrival</label>
//             <select className="form-select">
//               <option>Mumbai (BOM)</option>
//               <option>Kolhapur (KLH)</option>
//               <option>Pune (PUQ)</option>
//               <option>Belgavi (IXG)</option>
//               <option>Bengaluru (BLR)</option>
//               <option>Bhopal (BHO)</option>
//               <option>Chennai(MAA)</option>
//               <option>Delhi (DEL)</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Travel Date</label>
//             <input type="date" className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Passenger</label>
//             <select className="form-select">
//               <option>1 Passenger</option>
//               <option>2 Passengers</option>
//               <option>3 Passengers</option>
//               <option>4 Passengers</option>
//             </select>
//           </div>
//           <div className="col-md-3">
//             <label className="form-label"> Class</label>
//             <select className="form-select">
//               <option>First Class</option>
//               <option>Business Class</option>
//               <option>Economy Class</option>
//             </select>
//           </div>
//         </div>
//         <div className="text-center">
//           <button
//             type="button"
//             className="btn btn-primary px-5"
//             onClick={handleSearch}
//           >
//             Search Flight
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchFlight;

//------------------------------------------------------------------------------------------
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const SearchFlight = () => {
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate("/AvailableFlights"); // Navigate to Available Flights page
//   };

//   return (
//     <div>
//       <h2>Search Flight</h2>
//       <form>
//         <div>
//           <label>Departure</label>
//           <input type="text" value="Kolhapur (KHL)" readOnly />
//         </div>
//         <div>
//           <label>Arrival</label>
//           <input type="text" value="Mumbai (BOM)" readOnly />
//         </div>
//         <div>
//           <label>Travel Date</label>
//           <input type="date" />
//         </div>
//         <div>
//           <label>Passenger</label>
//           <select>
//             <option>1 Passenger</option>
//             <option>2 Passengers</option>
//             <option>3 Passengers</option>
//           </select>
//         </div>
//         <div>
//           <label>Class</label>
//           <select>
//             <option>First Class</option>
//             <option>Business Class</option>
//             <option>Economy Class</option>
//           </select>
//         </div>
//         <button type="button" onClick={handleSearch}>
//           Search Flight
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchFlight;
// /---------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SearchFlight.css"; // Import custom CSS file

// const SearchFlight = () => {
//   const navigate = useNavigate();
//   const [airports, setAirports] = useState([]);
//   const [searchData, setSearchData] = useState({
//     sourceId: "",
//     destinationId: "",
//     travelDate: "",
//   });

//   // ✅ Fetch Airports from Backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/flight/getAllAirport")
//       .then((response) => setAirports(response.data))
//       .catch((error) => console.error("Error fetching airports!", error));
//   }, []);

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // ✅ Handle Search Click
//   const handleSearch = () => {
//     if (
//       !searchData.sourceId ||
//       !searchData.destinationId ||
//       !searchData.travelDate
//     ) {
//       alert("Please select Source, Destination, and Travel Date.");
//       return;
//     }

//     // Pass search data to the next page via URL parameters
//     navigate(
//       `/available-flights?source=${searchData.sourceId}&destination=${searchData.destinationId}&date=${searchData.travelDate}`
//     );
//   };

//   return (
//     // <div className="container mt-5">
//     <div className="card p-4 shadow">
//       <form>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Departure</label>
//             <select
//               name="sourceId"
//               className="form-select"
//               value={searchData.sourceId}
//               onChange={handleChange}
//             >
//               <option value="">Select Departure</option>
//               {airports.map((airport) => (
//                 <option key={airport.airportId} value={airport.airportId}>
//                   {airport.airportName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Arrival</label>
//             <select
//               name="destinationId"
//               className="form-select"
//               value={searchData.destinationId}
//               onChange={handleChange}
//             >
//               <option value="">Select Arrival</option>
//               {airports.map((airport) => (
//                 <option key={airport.airportId} value={airport.airportId}>
//                   {airport.airportName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Travel Date</label>
//             <input
//               type="date"
//               name="travelDate"
//               className="form-control"
//               value={searchData.travelDate}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Passengers</label>
//             <select className="form-select">
//               <option>1 Passenger</option>
//               <option>2 Passengers</option>
//               <option>3 Passengers</option>
//               <option>4 Passengers</option>
//             </select>
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Class</label>
//             <select className="form-select">
//               <option>First Class</option>
//               <option>Business Class</option>
//               <option>Economy Class</option>
//             </select>
//           </div>
//         </div>
//         <div className="text-center">
//           <button
//             type="button"
//             className="btn btn-primary px-5"
//             onClick={handleSearch}
//           >
//             Search Flight
//           </button>
//         </div>
//       </form>
//     </div>
//     // </div>
//   );
// };

// export default SearchFlight;

////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./SearchFlight.css";

// const SearchFlight = () => {
//   const [airports, setAirports] = useState([]);
//   const [searchData, setSearchData] = useState({
//     sourceId: "",
//     destinationId: "",
//     travelDate: "",
//   });
//   const [flights, setFlights] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   // ✅ Fetch Airports from Backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/flight/getAllAirport")
//       .then((response) => setAirports(response.data))
//       .catch((error) => console.error("Error fetching airports!", error));
//   }, []);

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // ✅ Handle Search Click
//   const handleSearch = () => {
//     if (
//       !searchData.sourceId ||
//       !searchData.destinationId ||
//       !searchData.travelDate
//     ) {
//       alert("Please select Source, Destination, and Travel Date.");
//       return;
//     }

//     setIsLoading(true);
//     setHasSearched(true);

//     // Format date to ISO (yyyy-MM-dd) for the backend
//     const formattedDate = searchData.travelDate;

//     // Make API call to search flights
//     axios
//       .get("http://localhost:8080/flight/search", {
//         params: {
//           sourceId: searchData.sourceId,
//           destinationId: searchData.destinationId,
//           departureDate: formattedDate,
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
//   };

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

//   return (
//     <div className="flight-search-container">
//       <div className="card p-4 shadow">
//         <form>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label className="form-label">Departure</label>
//               <select
//                 name="sourceId"
//                 className="form-select"
//                 value={searchData.sourceId}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Departure</option>
//                 {airports.map((airport) => (
//                   <option key={airport.airportId} value={airport.airportId}>
//                     {airport.airportName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Arrival</label>
//               <select
//                 name="destinationId"
//                 className="form-select"
//                 value={searchData.destinationId}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Arrival</option>
//                 {airports.map((airport) => (
//                   <option key={airport.airportId} value={airport.airportId}>
//                     {airport.airportName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label className="form-label">Travel Date</label>
//               <input
//                 type="date"
//                 name="travelDate"
//                 className="form-control"
//                 formatDate="yyyy-mm-dd"
//                 value={searchData.travelDate}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-3">
//               <label className="form-label">Passengers</label>
//               <select className="form-select">
//                 <option>1 Passenger</option>
//                 <option>2 Passengers</option>
//                 <option>3 Passengers</option>
//                 <option>4 Passengers</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <label className="form-label">Class</label>
//               <select className="form-select">
//                 <option>First Class</option>
//                 <option>Business Class</option>
//                 <option>Economy Class</option>
//               </select>
//             </div>
//           </div>
//           <div className="text-center">
//             <button
//               type="button"
//               className="btn btn-primary px-5"
//               onClick={handleSearch}
//               disabled={isLoading}
//             >
//               {isLoading ? "Searching..." : "Search Flight"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Search Results Section */}
//       {hasSearched && (
//         <div className="mt-4">
//           <h3 className="mb-3">Available Flights</h3>

//           {isLoading ? (
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : flights.length > 0 ? (
//             <div className="flight-results">
//               {flights.map((flight) => (
//                 <div key={flight.flightId} className="card mb-3 flight-card">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-md-3">
//                         <h5 className="airline-name">{flight.airlineName}</h5>
//                         <p className="text-muted">{flight.aircraftModel}</p>
//                       </div>
//                       <div className="col-md-3">
//                         <div className="departure-info">
//                           <h5>{formatTime(flight.departureTime)}</h5>
//                           <p className="airport-name">
//                             {flight.sourceAirportName}
//                           </p>
//                           <small>{formatDate(flight.departureTime)}</small>
//                         </div>
//                       </div>
//                       <div className="col-md-2 flight-duration">
//                         <div className="duration-display">
//                           <div className="duration-time">{flight.duration}</div>
//                           <div className="flight-line">
//                             <div className="flight-dot"></div>
//                             <div className="flight-route"></div>
//                             <div className="flight-dot"></div>
//                           </div>
//                           <div className="small text-center">
//                             {flight.isDirect ? "Direct" : "Connecting"}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-md-2">
//                         <div className="arrival-info">
//                           <h5>{formatTime(flight.arrivalTime)}</h5>
//                           <p className="airport-name">
//                             {flight.destinationAirportName}
//                           </p>
//                           <small>{formatDate(flight.arrivalTime)}</small>
//                         </div>
//                       </div>
//                       <div className="col-md-2 price-section">
//                         <div className="price">
//                           ₹{flight.price.toLocaleString()}
//                         </div>
//                         <button className="btn btn-outline-primary btn-sm mt-2">
//                           Select
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="alert alert-info">
//               No flights available for the selected route and date. Please try
//               different search criteria.
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchFlight;

///////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./SearchFlight.css";

const SearchFlight = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [airports, setAirports] = useState([]);
  const [searchData, setSearchData] = useState({
    sourceId: "",
    destinationId: "",
    travelDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch Airports from Backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/flight/getAllAirport")
      .then((response) => setAirports(response.data))
      .catch((error) => console.error("Error fetching airports!", error));
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✅ Handle Search Click - Updated to redirect
  const handleSearch = () => {
    if (
      !searchData.sourceId ||
      !searchData.destinationId ||
      !searchData.travelDate
    ) {
      alert("Please select Source, Destination, and Travel Date.");
      return;
    }

    setIsLoading(true);

    // Format date to ISO (yyyy-MM-dd) for the backend
    const formattedDate = searchData.travelDate;

    // Redirect to results page with query parameters
    navigate(
      `/AvailableFlights?sourceId=${searchData.sourceId}&destinationId=${searchData.destinationId}&departureDate=${formattedDate}`
    );
  };

  return (
    // <div className="container mx-auto p-4">
    <div className="flight-search-container">
      <div className="card p-4 shadow">
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Departure</label>
              <select
                name="sourceId"
                className="form-select"
                value={searchData.sourceId}
                onChange={handleChange}
              >
                <option value="">Select Departure</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={airport.airportId}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Arrival</label>
              <select
                name="destinationId"
                className="form-select"
                value={searchData.destinationId}
                onChange={handleChange}
              >
                <option value="">Select Arrival</option>
                {airports.map((airport) => (
                  <option key={airport.airportId} value={airport.airportId}>
                    {airport.airportName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Travel Date</label>
              <input
                type="date"
                name="travelDate"
                className="form-control"
                formatDate="yyyy-mm-dd"
                value={searchData.travelDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Passengers</label>
              <select className="form-select">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4 Passengers</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Class</label>
              <select className="form-select">
                <option>First Class</option>
                <option>Business Class</option>
                <option>Economy Class</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary px-5"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search Flight"}
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default SearchFlight;
