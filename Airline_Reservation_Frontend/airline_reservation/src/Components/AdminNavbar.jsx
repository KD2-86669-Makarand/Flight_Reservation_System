import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/Passengers">Passengers</Link>
      <Link to="/AddAirport">Airport</Link>
      <Link to="/AddAirlines">Airline</Link>
      <Link to="/AddAircraft">Aircraft</Link>
      <Link to="/AddFlight">flight</Link>
      <Link to="/">LogOut</Link>
    </nav>
  );
};

export default Navbar;
