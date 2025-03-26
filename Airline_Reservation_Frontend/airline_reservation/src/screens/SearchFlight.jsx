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
