package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "Airports")
public class Airport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AirportId", length = 50)
	private Long airportId;

	@Column(name = "AirportName", length = 150)
	private String airportName;

	@Column(name = "AirportCode", length = 50)
	private String airportCode;

	@Column(name = "AirportLocation", length = 150)
	private String location;
	
	@Column(name = "Country", length = 50)
	private String country;

}
