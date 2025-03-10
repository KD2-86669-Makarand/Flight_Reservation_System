package com.example.demo.entity;


import java.time.Duration;

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
@Table(name = "Connections")
public class Connections {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ConnectionId")
	private Long connectionId;

	@ManyToOne
	@JoinColumn(name = "FirstScheduleId", referencedColumnName = "ScheduleId")
	private Schedule firstSchedule;

	@ManyToOne
	@JoinColumn(name = "SecondScheduleId", referencedColumnName = "ScheduleId")
	private Schedule secondSchedule;

	@ManyToOne
	@JoinColumn(name = "FlightId", referencedColumnName = "FlightId")
	private Flight flight;

	@Column(name = "MinimumLayoverTime")
	private Duration minimumLayoverTime; // correction needed

}
