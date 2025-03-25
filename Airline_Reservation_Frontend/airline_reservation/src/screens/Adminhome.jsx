import React from "react";
import "./home";
import SearchFlight from "./SearchFlight";
import AdminNavbar from "../Components/AdminNavbar";
import { Link } from "react-router-dom";
import passenger from "../Components/images/passenger.png";
function AdminHome() {
  return (
    <div>
      <header>
        <div class="logo">
          {/* <a href="UserList">Users</a> */}

          <Link to="/UserList">
            <img
              src={passenger}
              style={{ width: "25px", marginRight: "5px" }}
            />
            Users
          </Link>
        </div>
        <AdminNavbar />
      </header>
      <div class="hero">
        <h1>Begin your Adventures in comfort</h1>
        <SearchFlight />
      </div>
    </div>
  );
}

export default AdminHome;
