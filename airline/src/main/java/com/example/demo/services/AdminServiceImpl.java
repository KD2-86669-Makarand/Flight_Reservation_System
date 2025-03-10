package com.example.demo.services;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.example.demo.dao.FlightDao;
import com.example.demo.dao.PassengerDao;
import com.example.demo.dao.ScheduleDao;
import com.example.demo.dao.SeatsDao;
import com.example.demo.dao.SourceDao;
import com.example.demo.dao.UserDao;
import com.example.demo.custom_exception.ApiException;
import com.example.demo.dao.AircraftDao;
import com.example.demo.dao.AirlineDao;
import com.example.demo.dao.AirportDao;
import com.example.demo.dao.DestinationDao;
import com.example.demo.dao.EditDao;
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
import com.example.demo.entity.Airlines.Status;
import com.example.demo.entity.Airport;
import com.example.demo.entity.Destination;
import com.example.demo.entity.Flight;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.Source;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRole;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private FlightDao flightDao;
	
	@Autowired
	private AirlineDao airlineDao;
	
	@Autowired
	private AircraftDao aircraftDao;
	
	@Autowired
	private AirportDao airportDao;
	
	@Autowired
	private EditDao editDao;
	
	@Autowired 
	private ScheduleDao scheduleDao;
	
	@Autowired
	private SourceDao sourceDao;
	
	@Autowired
	private SeatsDao seatDao;
	
	@Autowired
	private DestinationDao destinationDao;
	
	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PassengerDao passengerDao;

	@Override
	public ApiResponse addFlight(FlightDTO flightDTO) {
	    Airlines airline = airlineDao.findById(flightDTO.getAirlineId())
	            .orElseThrow(() -> new ApiException("Airline not found"));

	    Aircraft aircraft = aircraftDao.findById(flightDTO.getAircraftId())
	            .orElseThrow(() -> new ApiException("Aircraft not found"));

	    Source source = sourceDao.findById(flightDTO.getSourceId())
	            .orElseThrow(() -> new ApiException("Source airport not found"));

	    Destination destination = destinationDao.findById(flightDTO.getDestinationId())
	            .orElseThrow(() -> new ApiException("Destination airport not found"));

	    // ✅ Convert String to LocalDateTime (Handle Null Values)
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
	    LocalDateTime departureTime = (flightDTO.getDepartureTime() != null)
	            ? LocalDateTime.parse(flightDTO.getDepartureTime(), formatter)
	            : null;
	    LocalDateTime arrivalTime = (flightDTO.getArrivalTime() != null)
	            ? LocalDateTime.parse(flightDTO.getArrivalTime(), formatter)
	            : null;

	    // ✅ Calculate Duration (Handle Null Values)
	    String formattedDuration = "00:00"; // Default
	    if (departureTime != null && arrivalTime != null) {
	        long totalMinutes = ChronoUnit.MINUTES.between(departureTime, arrivalTime);
	        if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight flights
	        formattedDuration = String.format("%02d:%02d", totalMinutes / 60, totalMinutes % 60);
	    }

	    // ✅ Create and Save Flight Entity
	    Flight flight = new Flight();
	    flight.setAirline(airline);
	    flight.setAircraft(aircraft);
	    flight.setSource(source);
	    flight.setDestination(destination);
	    flight.setDepartureTime(departureTime);
	    flight.setArrivalTime(arrivalTime);
	    flight.setDistance(flightDTO.getDistance());
	    flight.setDuration(formattedDuration);
	    flight.setPrice(flightDTO.getPrice());
	    flight.setDirect(true);

	    Flight savedFlight = flightDao.save(flight);
	    return new ApiResponse("Flight added successfully with ID: " + savedFlight.getFlightId());
	}

	
	
	@Override
	public ApiResponse addAirline(AirlineDTO airline) {
		Airlines airlines = modelMapper.map(airline, Airlines.class);
		Airlines saveAirlines = airlineDao.save(airlines);
		return new ApiResponse("Added new Airline With Id = " + saveAirlines.getAirlineId());
	}

	@Override
	public ApiResponse addAirport(AirportDTO airport) {
		Airport airports = modelMapper.map(airport, Airport.class);
		Airport saveAirports = airportDao.save(airports);
		
		Source sourceAirport = new Source();
		sourceAirport.setAirport(saveAirports);
		sourceDao.save(sourceAirport);
		
		Destination destinationAirport = new Destination();
		destinationAirport.setAirport(saveAirports);
		destinationDao.save(destinationAirport);
		
		return new ApiResponse("Added new Airline with Id = " + saveAirports.getAirportId());
	}



	@Override
	public List<AirlineDTO> getAllAirlines() {
		return airlineDao.findAll().stream()
	            .map(airline -> modelMapper.map(airline, AirlineDTO.class))
	            .collect(Collectors.toList());
	}
	


	@Override
	public ApiResponse getAirlineById(Long id) {
		Optional<Airlines> airline = airlineDao.findById(id);
		if (airline.isEmpty()) {
			return new ApiResponse("Airline not found");
		}
		AirlineDTO airlineDTO = modelMapper.map(airline.get(), AirlineDTO.class);
			return new ApiResponse("Success");
		    
	}

	
	@Override
	public ApiResponse softDeleteAirline(Long airlineId) {
	    Airlines airline = airlineDao.findById(airlineId)
	            .orElseThrow(() -> new ApiException("Airline not found with ID: " + airlineId));

	    if (airline.getStatus() == Airlines.Status.INACTIVE) {
	        throw new ApiException("Airline is already inactive!");
	    }

	    // Set airline status to INACTIVE
	    airline.setStatus(Airlines.Status.INACTIVE);
	    airlineDao.save(airline);

	    return new ApiResponse("Airline with ID: " + airlineId + " has been marked as INACTIVE.");
	}
	
	@Override
	public ApiResponse updateAirline(Long airlineId, AirlineDTO airlineDto) {
	    Airlines existingAirline = airlineDao.findById(airlineId)
	            .orElseThrow(() -> new RuntimeException("Airline not found for ID = " + airlineId));

	    // Use ModelMapper to map DTO fields to the existing entity
	    modelMapper.map(airlineDto, existingAirline);

	    // Save the updated airline to the database
	    Airlines updatedAirline = airlineDao.save(existingAirline);

	    // Return a response indicating success
	    return new ApiResponse("Airline updated successfully with ID = " + updatedAirline.getAirlineId());
	}
	
	@Override
	public ApiResponse updateAircraft(Long aircraftId, AircraftDTO aircraftDTO) {
	    Aircraft existingAircraft = aircraftDao.findById(aircraftId)
	            .orElseThrow(() -> new RuntimeException("Aircraft not found for ID = " + aircraftId));

	    // Use ModelMapper to map DTO fields to the existing entity
	    modelMapper.map(aircraftDTO, existingAircraft);

	    // Save the updated aircraft to the database
	    Aircraft updatedAircraft = aircraftDao.save(existingAircraft);

	    return new ApiResponse("Aircraft updated successfully with ID = " + updatedAircraft.getAircraftId());
	}


	
	@Override
	public List<AircraftDTO> getAllAircraft() {
	    return aircraftDao.findAll().stream()
	            .map(aircraft -> {
	                AircraftDTO dto = new AircraftDTO();
	                dto.setAircraftId(aircraft.getAircraftId());
	                dto.setAircraftModel(aircraft.getAircraftModel());
	                dto.setAircraftCapacity(aircraft.getAircraftCapacity());
	                dto.setAirlineName(aircraft.getAirline().getAirlineName());
	                dto.setAirlineId(aircraft.getAirline().getAirlineId()); // ✅ Ensure airlineId is included
	                return dto;
	            })
	            .collect(Collectors.toList());
	}


	@Override
	public ApiResponse addAircraft(AddAircraftDTO aircraft) {
		 // Fetch the airline entity using the airline ID from the DTO
	    Airlines airline = airlineDao.findById(aircraft.getAirline())
	            .orElseThrow(() -> new RuntimeException("Airline not found with ID: " + aircraft.getAirline()));

	    Aircraft aircrafts = new Aircraft();
	    aircrafts.setAirline(airline);
	    aircrafts.setAircraftModel(aircraft.getAircraftModel());
	    aircrafts.setAircraftCapacity(aircraft.getAircraftCapacity());

	    // Save the new aircraft entity
	    Aircraft savedAircraft = aircraftDao.save(aircrafts);
	    
	    // Return a response indicating success
	    return new ApiResponse("Added new Aircraft with ID = " + savedAircraft.getAircraftId());

	}

	@Override
	public List<Airport> getAllAirports() {
	        return airportDao.findAll();
	}


	@Override
	public ApiResponse updateAirport(Long airportId, AirportDTO airportDTO) {
		Airport airport = airportDao.findById(airportId)
	            .orElseThrow(() -> new RuntimeException("Aircraft not found for ID = " + airportId));

	    // Use ModelMapper to map DTO fields to the existing entity
	    modelMapper.map(airportDTO, airport);

	    // Save the updated aircraft to the database
	    Airport updatedAirport= airportDao.save(airport);

	    return new ApiResponse("Aircraft updated successfully with ID = " + updatedAirport.getAirportId());
	}
	
	@Override
	public List<FlightDTO> getAllFlights() {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

	    return flightDao.findAll().stream()
	            .map(flight -> {
	                FlightDTO dto = new FlightDTO();
	                dto.setFlightId(flight.getFlightId());
	                dto.setAirlineId(flight.getAirline().getAirlineId());
	                dto.setAirlineName(flight.getAirline().getAirlineName()); // ✅ Set Airline Name
	                dto.setAircraftId(flight.getAircraft().getAircraftId());
	                dto.setAircraftModel(flight.getAircraft().getAircraftModel()); // ✅ Set Aircraft Model
	                dto.setSourceId(flight.getSource().getSourceId());
	                dto.setSourceAirportName(flight.getSource().getAirport().getAirportName()); // ✅ Set Source Airport Name
	                dto.setDestinationId(flight.getDestination().getDestinationId());
	                dto.setDestinationAirportName(flight.getDestination().getAirport().getAirportName()); // ✅ Set Destination Airport Name

	                // ✅ Handle Null Values Before Formatting
	                dto.setDepartureTime(flight.getDepartureTime() != null
	                        ? flight.getDepartureTime().format(formatter) : null);
	                dto.setArrivalTime(flight.getArrivalTime() != null
	                        ? flight.getArrivalTime().format(formatter) : null);

	                dto.setDistance(flight.getDistance());
	            
	                dto.setPrice(flight.getPrice());
	                dto.setDirect(flight.isDirect());
	                dto.setDuration(flight.getDuration());
	                
	                dto.setTotalSeats(flight.getAircraft().getAircraftCapacity());
//
//	                // ✅ Fetch Available Seats Count
	                Long availableSeats = seatDao.countAvailableSeats(flight.getFlightId());
	                dto.setAvailableSeats(availableSeats != null ? availableSeats : 0);
	                
	                return dto;
	            })
	            .collect(Collectors.toList());
	}

	@Override
	public List<FlightDTO> searchFlights(Long sourceId, Long destinationId, LocalDate departureDate) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

	    List<Flight> flights = flightDao.findFlightsBySourceDestinationAndDate(sourceId, destinationId, departureDate);
	    
	    return flights.stream()
	        .map(flight -> {
	            FlightDTO dto = new FlightDTO();
	            dto.setFlightId(flight.getFlightId());
	            dto.setAirlineId(flight.getAirline().getAirlineId());
	            dto.setAirlineName(flight.getAirline().getAirlineName()); 
//	            dto.setAircraftId(flight.getAircraft().getAircraftId());
	            dto.setAircraftId(flight.getAircraft().getAircraftId());
	            dto.setAircraftModel(flight.getAircraft().getAircraftModel()); 
	            dto.setSourceId(flight.getSource().getSourceId());
	            dto.setSourceAirportName(flight.getSource().getAirport().getAirportName());
	            dto.setDestinationId(flight.getDestination().getDestinationId());
	            dto.setDestinationAirportName(flight.getDestination().getAirport().getAirportName());

	            dto.setDepartureTime(flight.getDepartureTime() != null
	                    ? flight.getDepartureTime().format(formatter) : null);
	            dto.setArrivalTime(flight.getArrivalTime() != null
	                    ? flight.getArrivalTime().format(formatter) : null);
	            dto.setDistance(flight.getDistance());
	            dto.setPrice(flight.getPrice());
	            dto.setDirect(flight.isDirect());
	            dto.setDuration(flight.getDuration());
	            System.out.println("Aircraft ID : " + dto.getAircraftId());
	            return dto;
	        })
	        .collect(Collectors.toList());
	    
	    
	}



	@Override
	public List<PassengerDTO> getAllPassengers() {
		return passengerDao.findAll().stream()
		        .map(passenger -> modelMapper.map(passenger, PassengerDTO.class))
		        .collect(Collectors.toList());
	}



	@Override
	public ApiResponse updatePassengers(Long passengerId, PassengerDTO passengerDto) {
		return null;
	
	}
}

