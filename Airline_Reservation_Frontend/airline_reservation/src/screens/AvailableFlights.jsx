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
  const selectedFlight = JSON.parse(sessionStorage.getItem("selectedFlight"));
  sessionStorage.setItem("flightId", selectedFlight.flightId); // Store flightId

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
