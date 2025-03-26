import React from "react";
import "./home";
import SearchFlight from "./SearchFlight";
import AdminNavbar from "../Components/AdminNavbar";
function AdminHome() {
  return (
    <div>
      <header>
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
