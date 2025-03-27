package com.example.demo.services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.AddAircraftDTO;
import com.example.demo.dto.AircraftDTO;
import com.example.demo.dto.AirlineDTO;
import com.example.demo.dto.AirportDTO;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.FlightDTO;
import com.example.demo.dto.FlightResponseDTO;
import com.example.demo.dto.PassengerDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserRespDTO;
import com.example.demo.entity.Aircraft;
import com.example.demo.entity.Airlines;
import com.example.demo.entity.Airport;
import com.example.demo.entity.Flight;

public interface AdminService {
	ApiResponse addFlight(FlightDTO flight);
	
	ApiResponse addAirline(AirlineDTO airline);
	
	ApiResponse addAircraft(AddAircraftDTO aircraft);
	
	ApiResponse addAirport(AirportDTO airport);
	
	public List<AircraftDTO> getAllAircraft();
	
	public List<AirlineDTO> getAllAirlines();
	
	ApiResponse getAirlineById(Long id);
	
	ApiResponse updateAirline(Long airlineId,AirlineDTO airlineDto);
	
	ApiResponse updateAircraft(Long aircraftId, AircraftDTO aircraftDTO);
	
	public ApiResponse softDeleteAirline(Long airlineId); 
	
	public List<FlightDTO> getAllFlights();
	
	List<Airport> getAllAirports();
	
	public ApiResponse updateAirport(Long airportId, AirportDTO airportDTO);
	
//	List<FlightDTO> searchFlights(Long sourceId, Long destinationId, LocalDate departureDate);
	List<FlightDTO> searchFlights(Long sourceId, Long destinationId, LocalDate departureDate);
	
//	ApiResponse bookFlight(BookingRequestDTO bookingRequest);
	
	List<PassengerDTO> getAllPassengers();
	
	ApiResponse updatePassengers(Long passengerId,PassengerDTO passengerDto);

//	void uploadImage(Long aircraftId, MultipartFile file) throws IOException;
//
//	byte[] getAircraftImage(Long aircraftId);
	
	public Flight getFlightDetails(Long flightId);
}
