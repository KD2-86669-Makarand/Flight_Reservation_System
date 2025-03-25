import React from "react";
import "./Home.css";
import SearchFlight from "./SearchFlight";
import { Link, Links } from "react-router-dom";
import Flights from "../Components/images/Flights.png";
import Booking from "../Components/images/Booking.png";
import Search from "../Components/images/Search.png";
import Logout from "../Components/images/Logout.png";
function Home() {
  return (
    <div>
      <header>
        <div>
          <img
            src="D:\Flihgt_Reservation_System\Flight_Reservation_System\Airline_Reservation_Frontend\airline_reservation\src\Components\images\planee.png"
            alt="Your Logo"
          />
        </div>
        <nav>
          <Link to="/AvailableFlights">
            <img src={Flights} style={{ width: "25px", marginRight: "5px" }} />
            Flights
          </Link>

          <Link>
            <img src={Booking} style={{ width: "25px", marginRight: "5px" }} />
            Booking
          </Link>

          <Link to="/SearchFlight">
            <img src={Search} style={{ width: "25px", marginRight: "5px" }} />
            Search
          </Link>

          <Link to="/">
            <img src={Logout} style={{ width: "25px", marginRight: "5px" }} />
            Logout
          </Link>
        </nav>
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

export default Home;
