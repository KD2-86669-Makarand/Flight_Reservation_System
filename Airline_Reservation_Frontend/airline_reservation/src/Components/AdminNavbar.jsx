import React from "react";
import { Link } from "react-router-dom";
import passenger from "../Components/images/passenger.png";
import Airport from "../Components/images/Airports.png";
import Airline from "../Components/images/Airline.png";
import Aircraft from "../Components/images/Aircraft.png";
import Flights from "../Components/images/Flights.png";
import Logout from "../Components/images/Logout.png";
const Navbar = () => {
  return (
    <nav>
      <Link to="/Passengers">
        <img src={passenger} style={{ width: "25px", marginRight: "5px" }} />
        Passengers
      </Link>
      <Link to="/AddAirport">
        <img src={Airport} style={{ width: "25px", marginRight: "5px" }} />
        Airport
      </Link>
      <Link to="/AddAirlines">
        <img src={Airline} style={{ width: "25px", marginRight: "5px" }} />
        Airline
      </Link>
      <Link to="/AddAircraft">
        <img src={Aircraft} style={{ width: "25px", marginRight: "5px" }} />
        Aircraft
      </Link>
      <Link to="/AddFlight">
        <img src={Flights} style={{ width: "25px", marginRight: "5px" }} />
        Flight
      </Link>
      <Link to="/">
        <img src={Logout} style={{ width: "25px", marginRight: "5px" }} />
        LogOut
      </Link>
    </nav>
  );
};

export default Navbar;
