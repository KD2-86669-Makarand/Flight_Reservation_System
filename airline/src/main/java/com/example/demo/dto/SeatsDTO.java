package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatsDTO 
{
	private Long seatId;
    private Long flightId;
    private String seatNumber;
    private String seatClass;
    private String seatStatus;
}
