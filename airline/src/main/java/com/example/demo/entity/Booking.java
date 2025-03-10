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
import jakarta.persistence.OneToOne;
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
@Table(name = "Bookings")

public class Booking {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingId")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "PassengerId", referencedColumnName = "PassengerId", nullable = false)
    private Passenger passenger;

    @ManyToOne
    @JoinColumn(name = "FlightId", referencedColumnName = "FlightId", nullable = false)
    private Flight flight;
    
    @ManyToOne
    @JoinColumn(name = "SeatId", referencedColumnName = "SeatId")
    private Seats seat;
    
    @OneToOne
    @JoinColumn(name = "SeatBookingId", referencedColumnName = "BookingId", nullable = false)
    private SeatBooking seatBooking; // ✅ Links the booked seat

    @Column(name = "BookingDate", nullable = false)
    private LocalDate bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "BookingStatus", nullable = false)
    private BookingStatus status;

    public enum BookingStatus {
        CONFIRMED, CANCELED
    }

}
