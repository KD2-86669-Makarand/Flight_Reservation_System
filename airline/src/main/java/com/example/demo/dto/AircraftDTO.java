package com.example.demo.dto;

import com.example.demo.entity.Airlines;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor

public class AircraftDTO
{
	private Long aircraftId;
	
	private String aircraftModel;

	private int aircraftCapacity;
	
    private String airlineName;
    
    private Long airlineId;
}
