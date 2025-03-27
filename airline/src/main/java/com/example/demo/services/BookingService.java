package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.BookingResponse;
import com.example.demo.dto.PassengerDTO;
import com.example.demo.dto.SeatsDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Flight;
import com.example.demo.entity.Passenger;
import com.example.demo.entity.Seats;

public interface BookingService 
{
	BookingResponse bookFlight(BookingDTO bookingDTO);

//	ApiResponse bookSeats(Long flightId, List<String> seatNumbers);
	public ApiResponse bookSeats(Long flightId, List<String> seatNumbers);
    
    public Optional<Passenger> getPassengerByEmail(String email);
    
    
    public List<SeatsDTO> getAvailableSeat(Long flightId);
    
    public List<SeatsDTO> getBookedSeats(Long flightId);
}

