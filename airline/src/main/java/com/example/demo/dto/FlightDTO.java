package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {
//    private Long flightId;
//    private Long airlineId;
//    private String airlineName;
//    private Long aircraftId;
//    private Long sourceId;
//    private String sourceAirportName;
//    private Long destinationId;
//    private String destinationAirportName;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") // ✅ Ensures correct time format in JSON
//    private LocalTime departureTime;
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm") // ✅ Ensures correct time format in JSON
//    private LocalTime arrivalTime;    
//    private boolean isDirect;
//    private Float distance;
//    private String duration;
//    private BigDecimal price;
	
	private Long flightId;
	private Long airlineId;
    private Long aircraftId;
    private Long sourceId;
    private Long destinationId;
    private String airlineName;
    private String aircraftModel;
    private String sourceAirportName;
    private String destinationAirportName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm") 
    private String departureTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm") 
    private String arrivalTime;

    private boolean isDirect;
    private Float distance;
    private String duration;
    private BigDecimal price;
    private int totalSeats;       // ✅ Total Seats
    private Long availableSeats;
    
}
