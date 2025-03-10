package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "Aircraft")
public class Aircraft {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AircraftId", length = 50)
	private Long aircraftId;

	@Column(name = "AircraftModel", length = 50)
	private String aircraftModel;

	@Column(name = "AircraftCapacity", length = 50)
	private int aircraftCapacity; // seats

	
	@ManyToOne
	@JoinColumn(name = "AirlineId", referencedColumnName = "AirlineId")
	private Airlines airline;

}
