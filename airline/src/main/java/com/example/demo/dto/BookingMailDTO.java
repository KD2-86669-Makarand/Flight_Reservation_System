package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingMailDTO 
{
	private String email;
    private String flightName;
    private String seatNumber;
    private String departureTime;
    private String arrivalTime;
}
