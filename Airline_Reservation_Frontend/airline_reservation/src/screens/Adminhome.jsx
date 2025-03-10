import React from "react";
import "./home";
import SearchFlight from "./SearchFlight";
import AdminNavbar from "../Components/AdminNavbar";

function AdminHome() {
  return (
    <div>
      <header>
        <div class="logo">
          <a href="UserList">Users</a>
        </div>
        <AdminNavbar />
      </header>
      <div class="hero">
        <h1>Begin your Adventures in comfort</h1>
        <SearchFlight />
      </div>

      {/* <div class="search-form">
            <form>
                <div class="section1">
                    <div class="form-group">
                        <label for="from">From</label>
                        <input type="text" id="from" name="from" placeholder="Enter departure city" />
                    </div>

                    <div class="form-group">
                        <label for="departure">Departure</label>
                        <input type="date" id="departure" name="departure" />
                    </div>
                </div>

                <div class="section2">
                    <div class="form-group">
                        <label for="to">To</label>
                        <input type="text" id="to" name="to" placeholder="Enter destination city" />
                    </div>

                    <div class="form-group">
                        <button type="submit">Search</button>
                    </div>
                </div>    
            </form>
        </div> */}
    </div>
  );
}

export default AdminHome;
