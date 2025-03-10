package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.PassengerDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.SeatsDTO;
import com.example.demo.entity.Passenger;
import com.example.demo.services.BookingService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController 
{
	@Autowired
    private BookingService bookingService;
	
	@Autowired
	private PassengerDao passengerDao;

//    @PostMapping("/bookSeat")
//    public ResponseEntity<ApiResponse> bookFlight(@RequestBody BookingDTO bookingDTO) {
//        ApiResponse response = bookingService.bookFlight(bookingDTO);
//        return ResponseEntity.ok(response);
//    }
	
	@PostMapping("/bookSeat")
    public ResponseEntity<ApiResponse> bookFlight(@RequestBody BookingDTO bookingDTO) {
        ApiResponse response = bookingService.bookFlight(bookingDTO);
        return ResponseEntity.ok(response);
    }

   
    @GetMapping("/available/{flightId}")
    public ResponseEntity<List<SeatsDTO>> getAvailableSeats(@PathVariable Long flightId) {
        List<SeatsDTO> availableSeats = bookingService.getAvailableSeat(flightId);
        return ResponseEntity.ok(availableSeats);
    }

    
    
    @GetMapping("/getByEmail")
    public ResponseEntity<Passenger> getPassengerByEmail(@RequestParam String email) {
        Optional<Passenger> passenger = passengerDao.findByEmail(email);
        if (passenger.isPresent()) {
            return new ResponseEntity<>(passenger.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
       
 


}
