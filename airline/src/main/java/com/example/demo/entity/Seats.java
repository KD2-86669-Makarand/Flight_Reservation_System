package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Seats")
public class Seats {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SeatId")
	private Long seatId;
	
	@ManyToOne
    @JoinColumn(name = "FlightId", referencedColumnName = "FlightId", nullable = false)
    private Flight flight;
	
	@ManyToOne
	@JoinColumn(name = "AircraftId", referencedColumnName = "AircraftId")
	private Aircraft aircraft;

	@Column(name = "SeatNumber", length = 15, nullable = false)
	private String seatNumber;

	@Enumerated(EnumType.STRING)
	@Column(name = "Class")
	private SeatClass seatClass;

	public enum SeatClass {
		ECONOMY, BUSINESS, FIRST
	}
	
	@Enumerated(EnumType.STRING)
    @Column(name = "SeatStatus", nullable = false)
    private SeatStatus status;
	
	@Column(name = "IsBooked", nullable = false)
    private boolean isBooked = false;
		
	public enum SeatStatus {
        AVAILABLE, BOOKED
    }
}
