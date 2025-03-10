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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TicketDetails")
public class TicketDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TicketId")
	private Long ticketId;
	
	@Column(name = "TicketNumber", unique = true, nullable = false)
	private int ticketNumber;

	@ManyToOne
	@JoinColumn(name = "BookingId", referencedColumnName = "BookingId")
	private Booking booking;

	@ManyToOne
	@JoinColumn(name = "SeatId", referencedColumnName = "SeatId")
	private Seats seats;

	@Column(name = "IssueDate")
	private LocalDateTime issueDate;
	
	@ManyToOne
    @JoinColumn(name = "PassengerId", referencedColumnName = "PassengerId")
    private Passenger passenger;
	

}
