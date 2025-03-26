import "./App.css";
import Login from "./screens/login";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Register from "./screens/Register";
import SearchFlight from "./screens/SearchFlight";
import AvailableFlights from "./screens/AvailableFlights";
import AddAirline from "./screens/AddAirlines";
import AdminHome from "./screens/Adminhome";
import UserList from "./screens/Users";
import AddAircraft from "./screens/AddAircraft";
import AddFlight from "./screens/AddFlight";
import AddAirport from "./screens/AddAirport";
import UserHome from "./screens/UserHome";
import Passengers from "./screens/Passengers";
// import FlightSeatLayout from "./screens/SeatLayout";
import BookingSeats from "./screens/BookSeat";
import PaymentForm from "./screens/Payment";
import BookedSeatsTable from "./screens/BookingsConfirmation";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="SearchFlight" element={<SearchFlight />} />
        {/* <Route path="AvailableFlights" element={<AvailableFlights />} /> */}
        <Route path="AvailableFlights" element={<AvailableFlights />} />
        <Route path="AddAirlines" element={<AddAirline />} />
        <Route path="AdminHome" element={<AdminHome />} />
        <Route path="UserHome" element={<UserHome />} />
        <Route path="UserList" element={<UserList />} />
        <Route path="AddAircraft" element={<AddAircraft />} />
        <Route path="AddFlight" element={<AddFlight />} />
        <Route path="AddAirport" element={<AddAirport />} />
        <Route path="Passengers" element={<Passengers />} />
        {/* <Route path="SeatLayout" element={<FlightSeatLayout />} /> */}
        <Route path="BookSeat" element={<BookingSeats />} />
        <Route path="Payment" element={<PaymentForm />} />
        <Route path="BookingsConfirmation" element={<BookedSeatsTable />} />
      </Routes>
    </div>
  );
}

export default App;
