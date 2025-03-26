import React from "react";
import { Link } from "react-router-dom";
import passenger from "../Components/images/passenger.png";
import Airport from "../Components/images/Airports.png";
import Airline from "../Components/images/Airline.png";
import Aircraft from "../Components/images/Aircraft.png";
import Flights from "../Components/images/Flights.png";
import Logout from "../Components/images/Logout.png";
import Ticket from "../Components/images/Ticket.png";
import Logo from "../Components/images/MB.png";
const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100px",
        backgroundColor: "white",
        padding: "0 20px",
        position: "fixed", // Fixed position to keep logo in place
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo on the left */}
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          style={{ height: "100%", marginRight: "10px" }}
          alt="Logo"
        />
      </div>

      {/* Links on the right */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/UserList"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={passenger} style={{ width: "25px", marginRight: "5px" }} />
          Users
        </Link>

        <Link
          to="/BookingsConfirmation"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Ticket} style={{ width: "25px", marginRight: "5px" }} />
          Bookings
        </Link>

        <Link
          to="/Passengers"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={passenger} style={{ width: "25px", marginRight: "5px" }} />
          Passengers
        </Link>

        <Link
          to="/AddAirport"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Airport} style={{ width: "25px", marginRight: "5px" }} />
          Airport
        </Link>

        <Link
          to="/AddAirlines"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Airline} style={{ width: "25px", marginRight: "5px" }} />
          Airline
        </Link>

        <Link
          to="/AddAircraft"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Aircraft} style={{ width: "25px", marginRight: "5px" }} />
          Aircraft
        </Link>

        <Link
          to="/AddFlight"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Flights} style={{ width: "25px", marginRight: "5px" }} />
          Flight
        </Link>

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          <img src={Logout} style={{ width: "25px", marginRight: "5px" }} />
          LogOut
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import passenger from "../Components/images/passenger.png";
// import Airport from "../Components/images/Airports.png";
// import Airline from "../Components/images/Airline.png";
// import Aircraft from "../Components/images/Aircraft.png";
// import Flights from "../Components/images/Flights.png";
// import Logout from "../Components/images/Logout.png";
// import Ticket from "../Components/images/Ticket.png";
// import Logo from "../Components/images/MB.png";

// const Navbar = () => {
//   return (
//     <nav
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between", // Push logo left & links right
//         height: "100px",
//         backgroundColor: "white",
//         padding: "0 20px",
//       }}
//     >
//       {/* Logo on the left */}
//       <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
//         <img
//           src={Logo}
//           style={{ height: "100%", marginRight: "10px" }}
//           alt="Logo"
//         />
//       </div>

//       {/* Links on the right */}
//       <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//         <Link
//           to="/UserList"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={passenger} style={{ width: "25px", marginRight: "5px" }} />
//           Users
//         </Link>

//         <Link
//           to="/BookingsConfirmation"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Ticket} style={{ width: "25px", marginRight: "5px" }} />
//           Bookings
//         </Link>

//         <Link
//           to="/Passengers"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={passenger} style={{ width: "25px", marginRight: "5px" }} />
//           Passengers
//         </Link>

//         <Link
//           to="/AddAirport"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Airport} style={{ width: "25px", marginRight: "5px" }} />
//           Airport
//         </Link>

//         <Link
//           to="/AddAirlines"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Airline} style={{ width: "25px", marginRight: "5px" }} />
//           Airline
//         </Link>

//         <Link
//           to="/AddAircraft"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Aircraft} style={{ width: "25px", marginRight: "5px" }} />
//           Aircraft
//         </Link>

//         <Link
//           to="/AddFlight"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Flights} style={{ width: "25px", marginRight: "5px" }} />
//           Flight
//         </Link>

//         <Link
//           to="/"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "black",
//           }}
//         >
//           <img src={Logout} style={{ width: "25px", marginRight: "5px" }} />
//           LogOut
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
