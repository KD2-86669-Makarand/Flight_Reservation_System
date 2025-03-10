package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.internal.bytebuddy.dynamic.TypeResolutionStrategy.Passive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BookingDao;
import com.example.demo.dao.FlightDao;
import com.example.demo.dao.PassengerDao;
import com.example.demo.dao.SeatBookingDao;
import com.example.demo.dao.SeatsDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.PassengerDTO;
import com.example.demo.dto.SeatsDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Flight;
import com.example.demo.entity.Passenger;
import com.example.demo.entity.SeatBooking;
import com.example.demo.entity.Seats;
import com.example.demo.entity.Seats.SeatClass;
import com.example.demo.entity.Seats.SeatStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
    private BookingDao bookingDao;
    
    @Autowired
    private PassengerDao passengerDao;
    
    @Autowired
    private FlightDao flightDao;
    
    @Autowired
    private SeatsDao seatsDao;
    
    @Autowired
    private SeatBookingDao seatBookingDao;
    
    @Autowired
    ModelMapper modelMapper;

//    @Override
//    public ApiResponse bookFlight(BookingDTO bookingDTO) {
//        Flight flight = flightDao.findById(bookingDTO.getFlightId())
//                .orElseThrow(() -> new RuntimeException("Flight not found"));
//
//        Seats seat = seatsDao.findById(bookingDTO.getSeatId())
//                .orElseThrow(() -> new RuntimeException("Seat not found"));
//
//        // Re-check seat status before booking
//        if (seatsDao.countAvailableSeats(flight.getFlightId()) == 0) {
//            return new ApiResponse("❌ No available seats left in this flight!");
//        }
//        
//        if (seat.isBooked()) {
//            return new ApiResponse("Seat " + seat.getSeatNumber() + " is already booked!");
//        }
//
//        // ✅ Mark seat as booked
//        seat.setBooked(true);
//        seat.setStatus(SeatStatus.BOOKED);
//        seatsDao.save(seat);
//
//        // ✅ Reduce available seat count safely
////        flight.setAvailableSeats(flight.getTotalSeats() - 1);
//        flightDao.save(flight);
//
//        Booking booking = new Booking();
//        booking.setFlight(flight);
//        booking.setSeat(seat);
//        booking.setPassenger(passengerDao.findById(bookingDTO.getPassengerId())
//                .orElseThrow(() -> new RuntimeException("Passenger not found")));
//        booking.setBookingDate(bookingDTO.getBookingDate());
//        booking.setStatus(Booking.BookingStatus.CONFIRMED);
//
//        bookingDao.save(booking);
//
//        return new ApiResponse("✅ Seat " + seat.getSeatNumber() + " booked successfully! ");
//    }
    
    @Override
    public ApiResponse bookFlight(BookingDTO bookingDTO) {
        Passenger passenger = passengerDao.findById(bookingDTO.getPassengerId())
                .orElseThrow(() -> new RuntimeException("Passenger not found"));

        Flight flight = flightDao.findById(bookingDTO.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Seats seat = seatsDao.findById(bookingDTO.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (seat.isBooked()) {
            return new ApiResponse("❌ Seat " + seat.getSeatNumber() + " is already booked!");
        }

        // ✅ Mark seat as booked
        seat.setBooked(true);
        seat.setStatus(SeatStatus.BOOKED);
        seatsDao.save(seat);

        // ✅ Create Seat Booking Entry
        SeatBooking seatBooking = new SeatBooking();
        seatBooking.setPassenger(passenger);
        seatBooking.setSeat(seat);
        seatBooking.setBookingDate(LocalDate.now());
        seatBooking.setStatus(SeatBooking.BookingStatus.CONFIRMED);
        SeatBooking savedSeatBooking = seatBookingDao.save(seatBooking);

        // ✅ Create Flight Booking Entry
        Booking booking = new Booking();
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setPassenger(passenger);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setSeatBooking(savedSeatBooking);

        bookingDao.save(booking);

        return new ApiResponse("✅ Seat " + seat.getSeatNumber() + " booked successfully!");
    }

    
    @Override
    public List<SeatsDTO> getAvailableSeat(Long flightId) {
        List<Seats> availableSeats = seatsDao.findAvailableSeatsByFlightId(flightId);

        return availableSeats.stream()
            .map(seat -> new SeatsDTO(
                seat.getSeatId(),
                seat.getFlight() != null ? seat.getFlight().getFlightId() : null, 
                seat.getSeatNumber(),
                seat.getSeatClass() != null ? seat.getSeatClass().name() : "ECONOMY", 
                seat.getStatus() != null ? seat.getStatus().name() : "AVAILABLE" 
            ))
            .collect(Collectors.toList());
    }

    @Override
    public ApiResponse bookSeats(Long flightId, List<String> seatNumbers) {
        List<Seats> seatsToBook = seatsDao.findSeatsByFlightAndNumbers(flightId, seatNumbers);

        if (seatsToBook.isEmpty()) {
            return new ApiResponse("Seats are no longer available.");
        }

        for (Seats seat : seatsToBook) {
            seat.setStatus(Seats.SeatStatus.BOOKED);
        }

        seatsDao.saveAll(seatsToBook);
        return new ApiResponse("Booking successful! Seats " + seatNumbers + " confirmed.");
    }

	@Override
	public Optional<Passenger> getPassengerByEmail(String email) {
        return passengerDao.findByEmail(email);
    }


}
