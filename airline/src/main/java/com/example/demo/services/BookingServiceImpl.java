package com.example.demo.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.antlr.v4.runtime.misc.TestRig;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.RuntimeBeanNameReference;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dao.BookingDao;
import com.example.demo.dao.FlightDao;
import com.example.demo.dao.PassengerDao;
import com.example.demo.dao.SeatBookingDao;
import com.example.demo.dao.SeatsDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.BookingResponse;
import com.example.demo.dto.PassengerDTO;
import com.example.demo.dto.SeatsDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Flight;
import com.example.demo.entity.Passenger;
import com.example.demo.entity.SeatBooking;
import com.example.demo.entity.Seats;
import com.example.demo.entity.Seats.SeatClass;
import com.example.demo.entity.Seats.SeatStatus;
import com.example.demo.entity.UserEntity;

import jakarta.transaction.Transactional;
import com.example.demo.services.EmailService;
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
    
    @Autowired
    private EmailService emailService;

//    @Override
//    public BookingResponse bookFlight(BookingDTO bookingDTO) {
//        System.out.println("Received booking request: " + bookingDTO);
//
//        if (bookingDTO.getPassengerId() == null || bookingDTO.getFlightId() == null || bookingDTO.getSeatId() == null) {
//            throw new IllegalArgumentException("Passenger ID, Flight ID, and Seat ID must not be null.");
//        }
//
//        Passenger passenger = passengerDao.findById(bookingDTO.getPassengerId())
//                .orElseThrow(() -> new RuntimeException("Passenger not found"));
//
//        Flight flight = flightDao.findById(bookingDTO.getFlightId())
//                .orElseThrow(() -> new RuntimeException("Flight not found"));
//
//        Seats seat = seatsDao.findById(bookingDTO.getSeatId())
//                .orElseThrow(() -> new RuntimeException("Seat not found"));
//
//        if (seat.isBooked()) {
//            throw new RuntimeException("❌ Seat " + seat.getSeatNumber() + " is already booked!");
//        }
//
//        // Update seat status
//        seat.setBooked(true);
//        seat.setStatus(SeatStatus.BOOKED);
//        seatsDao.save(seat);
//
//        // Create and save SeatBooking
//        SeatBooking seatBooking = new SeatBooking();
//        seatBooking.setPassenger(passenger);
//        seatBooking.setSeat(seat);
//        seatBooking.setBookingDate(LocalDate.now());
//        seatBooking.setStatus(SeatBooking.BookingStatus.CONFIRMED);
//        SeatBooking savedSeatBooking = seatBookingDao.save(seatBooking);
//
//        // Create and save Booking
//        Booking booking = new Booking();
//        booking.setFlight(flight);
//        booking.setSeat(seat);
//        booking.setPassenger(passenger);
//        booking.setBookingDate(LocalDate.now());
//        booking.setStatus(Booking.BookingStatus.CONFIRMED);
//        booking.setSeatBooking(savedSeatBooking);
//        Booking savedBooking = bookingDao.save(booking);
//
//        // ✅ Return BookingResponse with bookingId and success message
//        return new BookingResponse(savedBooking.getBookingId(), "✅ Seat " + seat.getSeatNumber() + " booked successfully!");
//    }
    
//    @Override
//    public BookingResponse bookFlight(BookingDTO bookingDTO) {
//        System.out.println("Received booking request: " + bookingDTO);
//
//        if (bookingDTO.getPassengerId() == null || bookingDTO.getFlightId() == null || bookingDTO.getSeatId() == null) {
//            throw new IllegalArgumentException("Passenger ID, Flight ID, and Seat ID must not be null.");
//        }
//
//        Passenger passenger = passengerDao.findById(bookingDTO.getPassengerId())
//                .orElseThrow(() -> new RuntimeException("Passenger not found"));
//
//        Flight flight = flightDao.findById(bookingDTO.getFlightId())
//                .orElseThrow(() -> new RuntimeException("Flight not found"));
//
//        Seats seat = seatsDao.findById(bookingDTO.getSeatId())
//                .orElseThrow(() -> new RuntimeException("Seat not found"));
//
//        if (seat.isBooked()) {
//            throw new RuntimeException("❌ Seat " + seat.getSeatNumber() + " is already booked!");
//        }
//
//        // Update seat status
//        seat.setBooked(true);
//        seat.setStatus(SeatStatus.BOOKED);
//        seatsDao.save(seat);
//
//        // Create and save SeatBooking
//        SeatBooking seatBooking = new SeatBooking();
//        seatBooking.setPassenger(passenger);
//        seatBooking.setSeat(seat);
//        seatBooking.setBookingDate(LocalDate.now());
//        seatBooking.setStatus(SeatBooking.BookingStatus.CONFIRMED);
//        SeatBooking savedSeatBooking = seatBookingDao.save(seatBooking);
//
//        // Create and save Booking
//        Booking booking = new Booking();
//        booking.setFlight(flight);
//        booking.setSeat(seat);
//        booking.setPassenger(passenger);
//        booking.setBookingDate(LocalDate.now());
//        booking.setStatus(Booking.BookingStatus.CONFIRMED);
//        booking.setSeatBooking(savedSeatBooking);
//        Booking savedBooking = bookingDao.save(booking);
//
//        // ✅ Send booking confirmation email
//        String passengerName = passenger.getFirstName() + " "+ passenger.getLastName(); 
//        String flightDetails = flight.getSource().getAirport() + " to " + flight.getDestination()
//                + " on " + flight.getDepartureTime();
//        String seatNumber = seat.getSeatNumber();
//        emailService.sendBookingConfirmation(passenger.getEmail(), flightDetails, seatNumber, seatNumber, seatNumber, passengerName);
//
//        // ✅ Return BookingResponse with bookingId and success message
//        return new BookingResponse(savedBooking.getBookingId(), "✅ Seat " + seat.getSeatNumber() + " booked successfully!");
//    }

    @Override
    public BookingResponse bookFlight(BookingDTO bookingDTO) {
        System.out.println("Received booking request: " + bookingDTO);

        if (bookingDTO.getPassengerId() == null || bookingDTO.getFlightId() == null || bookingDTO.getSeatId() == null) {
            throw new IllegalArgumentException("Passenger ID, Flight ID, and Seat ID must not be null.");
        }

        Passenger passenger = passengerDao.findById(bookingDTO.getPassengerId())
                .orElseThrow(() -> new RuntimeException("Passenger not found"));

        Flight flight = flightDao.findById(bookingDTO.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Seats seat = seatsDao.findById(bookingDTO.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (seat.isBooked()) {
            throw new RuntimeException("❌ Seat " + seat.getSeatNumber() + " is already booked!");
        }

        // Update seat status
        seat.setBooked(true);
        seat.setStatus(SeatStatus.BOOKED);
        seatsDao.save(seat);

        // Create and save SeatBooking
        SeatBooking seatBooking = new SeatBooking();
        seatBooking.setPassenger(passenger);
        seatBooking.setSeat(seat);
        seatBooking.setBookingDate(LocalDate.now());
        seatBooking.setStatus(SeatBooking.BookingStatus.CONFIRMED);
        SeatBooking savedSeatBooking = seatBookingDao.save(seatBooking);

        // Create and save Booking
        Booking booking = new Booking();
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setPassenger(passenger);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setSeatBooking(savedSeatBooking);
        Booking savedBooking = bookingDao.save(booking);

        // ✅ Send booking confirmation email
        String passengerName = passenger.getFirstName() + " " + passenger.getLastName();
        BigDecimal amount = flight.getPrice();
        Class<? extends Flight> seatClass = flight.getClass();
        String source = flight.getSource().getAirport().getAirportName();
        String destination = flight.getDestination().getAirport().getAirportName();
        String departureTime = flight.getDepartureTime().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));
        String seatNumber = seat.getSeatNumber();

        emailService.sendBookingConfirmation(passenger.getEmail(), source, destination, departureTime, seatNumber, passengerName, amount, seatClass);

        // ✅ Return BookingResponse with bookingId and success message
        return new BookingResponse(savedBooking.getBookingId(), "✅ Seat " + seat.getSeatNumber() + " booked successfully!");
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
    	public ApiResponse bookSeats(@RequestBody Long flightId, List<String> seatNumbers) {
        List<Seats> seatsToBook = seatsDao.findSeatsByFlightAndNumbers(flightId, seatNumbers);

        if (seatsToBook.isEmpty()) {
            return new ApiResponse("❌ Seats are no longer available.");
        }

        for (Seats seat : seatsToBook) {
            seat.setStatus(Seats.SeatStatus.BOOKED);
        }

        seatsDao.saveAll(seatsToBook);
        return new ApiResponse("✅ Booking successful! Seats " + seatNumbers + " confirmed.");
    }

	@Override
	public Optional<Passenger> getPassengerByEmail(String email) {
        return passengerDao.findByEmail(email);
    }


	@Override
	public List<SeatsDTO> getBookedSeats(Long flightId) {
		 List<Seats> bookedSeats = seatsDao.findBookedSeatsByFlightId(flightId);

		    if (bookedSeats.isEmpty()) {
		        throw new RuntimeException("No booked seats found for flight ID: " + flightId);
		    }

		    return bookedSeats.stream()
		        .map(seat -> new SeatsDTO(
		            seat.getSeatId(),
		            seat.getFlight() != null ? seat.getFlight().getFlightId() : null,
		            seat.getSeatNumber(),
		            seat.getSeatClass() != null ? seat.getSeatClass().name() : "ECONOMY",
		            seat.getStatus() != null ? seat.getStatus().name() : "BOOKED"
		        ))
		        .collect(Collectors.toList());
	}

	

	

}
