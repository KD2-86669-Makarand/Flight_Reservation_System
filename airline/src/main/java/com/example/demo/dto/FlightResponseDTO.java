package com.example.demo.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonFormat;

public class FlightResponseDTO 
{
	private Long flightId;
    private String airlineName;
    private String sourceAirportName;
    private String destinationAirportName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm") 
    private String departureTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private String arrivalTime;

    private String duration;
    private Float distance;
    private BigDecimal price;
    private boolean isDirect;
}
