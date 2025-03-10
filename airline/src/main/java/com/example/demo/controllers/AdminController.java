package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.AircraftDao;
import com.example.demo.dao.AirlineDao;
import com.example.demo.dao.AirportDao;
import com.example.demo.dao.FlightDao;
import com.example.demo.dto.AddAircraftDTO;
import com.example.demo.dto.AircraftDTO;
import com.example.demo.dto.AirlineDTO;
import com.example.demo.dto.AirlineDTO.Status;
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
import com.example.demo.services.AdminService;
import com.example.demo.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/flight")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://192.168.1.17:3000")
public class AdminController {
	@Autowired
	private AdminService flightService;
	
	@Autowired
	private AirlineDao airlineDao;
	
	@Autowired
	private AircraftDao aircraftDao;
	
	@Autowired
	private AirportDao airportDao;
	
	@Autowired
	private FlightDao flightDao;
	
	@Autowired 
	ModelMapper modelmapper;
	
	
	@PostMapping("/addAirline")
	public ResponseEntity<ApiResponse> addAirline(@RequestBody AirlineDTO airline)
	{
		try {
			ApiResponse apiResponse = flightService.addAirline(airline);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(apiResponse);
		}
		catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/addAircraft")
	public ResponseEntity<ApiResponse> addAircraft(@RequestBody AddAircraftDTO aircraft)
	{
		try {
			ApiResponse apiResponse = flightService.addAircraft(aircraft);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(apiResponse);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/airline/{airlineId}/deactivate")
	public ResponseEntity<ApiResponse> deactivateAirline(@PathVariable Long airlineId) {
	    ApiResponse response = flightService.softDeleteAirline(airlineId);
	    return ResponseEntity.ok(response);
	}



	
	@PostMapping("/deleteAirline")
	public ResponseEntity<ApiResponse> deleteAirline(@RequestBody AirlineDTO airlineDTO) {
	    try {
	        Optional<Airlines> airline = airlineDao.findById(airlineDTO.getAirlineId());
	        
	        if (airline.isPresent()) {
	            airlineDao.delete(airline.get());
	            return ResponseEntity.status(HttpStatus.NO_CONTENT)
	                    .body(new ApiResponse("Airline deleted successfully"));
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body(new ApiResponse("Airline not found"));
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(new ApiResponse(e.getMessage()));
	    }
	}

	@PutMapping("/updateAirline/{id}")
	public ResponseEntity<Airlines> updateAirline(@PathVariable Long id, @RequestBody Airlines updateAirlines)
	{
		return airlineDao.findById(id).map(existingAirline -> {
	        modelmapper.map(updateAirlines, existingAirline);
	        Airlines savedAirline = airlineDao.save(existingAirline);
	        return ResponseEntity.ok(savedAirline);
	    }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}
	
	@PutMapping("/updateAircraft/{id}")
	public ResponseEntity<ApiResponse> updateAircraft(@PathVariable Long id, @RequestBody AircraftDTO aircraftDTO) {
	    try {
	        ApiResponse response = flightService.updateAircraft(id, aircraftDTO);
	        return ResponseEntity.ok(response);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	    }
	}
	
	@GetMapping("/getAirline/{id}")
	public ResponseEntity<ApiResponse> getAirlineById(@PathVariable Long id) {
	    ApiResponse response = flightService.getAirlineById(id);
	    if (response.getMessage().equals("Airline not found")) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/getAllAircraft")
    public ResponseEntity<List<AircraftDTO>> getAllAircraft() {
        List<AircraftDTO> aircraftList = flightService.getAllAircraft();
        if (aircraftList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(aircraftList);
    }
	
	// getAirlineController
	@GetMapping("/getAllAirline")
    public ResponseEntity<List<AirlineDTO>> getAllAirlines() {
        List<AirlineDTO> airlineList = flightService.getAllAirlines();
        if (airlineList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(airlineList);
    }
	

		
	@PostMapping("/addFlight")
    public ResponseEntity<ApiResponse> addFlight(@RequestBody FlightDTO flightDTO) {
        try {
            ApiResponse response = flightService.addFlight(flightDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
        }
    }

    // ✅ Get All Flights
    @GetMapping("/getAllFlights")
    public ResponseEntity<List<FlightDTO>> getAllFlights() {
        List<FlightDTO> flights = flightService.getAllFlights();
        if (flights.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(flights);
    }
	
	@GetMapping("/getAllAirport")
    public ResponseEntity<List<Airport>> getAllAirports() {
        List<Airport> airports = flightService.getAllAirports();
        return ResponseEntity.ok(airports);
    }
	
	
	@PostMapping("/addAirport")
    public ResponseEntity<ApiResponse> addAirport(@RequestBody AirportDTO airportDTO) {
        try {
            ApiResponse apiResponse = flightService.addAirport(airportDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error: " + e.getMessage()));
        }
    }
	
	@PutMapping("/updateAirport/{id}")
	public ResponseEntity<Airport> updateAirport(@PathVariable Long id, @RequestBody Airport updateAirport)
	{
		return airportDao.findById(id).map(existingAirport -> {
	        modelmapper.map(updateAirport, existingAirport);
	        Airport savedAirport = airportDao.save(existingAirport);
	        return ResponseEntity.ok(savedAirport);
	    }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<FlightDTO>> searchFlights(
	    @RequestParam Long sourceId,
	    @RequestParam Long destinationId,
	    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate) {

	    try {
	        List<FlightDTO> flights = flightService.searchFlights(sourceId, destinationId, departureDate);
	        
	        if (flights.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	        }
	        
	        return ResponseEntity.ok(flights);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}
	
	@GetMapping("/getAllPassengers")
	public ResponseEntity<List<PassengerDTO>> getAllPassengers() {
	    List<PassengerDTO> passengers = flightService.getAllPassengers();
	    return ResponseEntity.ok(passengers);
	}



}