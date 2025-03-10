package com.example.demo.entity;

import java.time.LocalDate;

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
@Table(name = "SeatBookings")
public class SeatBooking {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "BookingId")
	    private Long bookingId;

	    @ManyToOne
	    @JoinColumn(name = "PassengerId", referencedColumnName = "PassengerId", nullable = false)
	    private Passenger passenger;

	    @ManyToOne
	    @JoinColumn(name = "SeatId", referencedColumnName = "SeatId", nullable = false)
	    private Seats seat;

	    @Column(name = "BookingDate", nullable = false)
	    private LocalDate bookingDate;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "BookingStatus", nullable = false)
	    private BookingStatus status;

	    public enum BookingStatus {
	        CONFIRMED, CANCELED
	    }
	}


