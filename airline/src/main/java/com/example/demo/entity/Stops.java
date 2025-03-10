package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Stops")
public class Stops {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "StopID")
	private Long stopID;

	@ManyToOne
	@JoinColumn(name = "FlightId", referencedColumnName = "FlightId")
	private Flight flight;

	@ManyToOne
	@JoinColumn(name = "AirportId", referencedColumnName = "AirportId")
	private Airport airport;

	@Column(name = "ArrivalTime")
	private LocalDateTime arrivalTime;

	@Column(name = "DepartureTime")
	private LocalDateTime departureTime;

//	@Column(name = "SequenceNumber")
//	private int sequenceNumber;

}
