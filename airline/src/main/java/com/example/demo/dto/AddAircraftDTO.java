package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class AddAircraftDTO {
	
		private String aircraftModel;

		private int aircraftCapacity;

		private Long airline;
		
}


