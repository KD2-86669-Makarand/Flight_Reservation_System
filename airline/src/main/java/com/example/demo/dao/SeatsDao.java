package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Flight;
import com.example.demo.entity.Seats;
import com.example.demo.entity.Seats.SeatStatus;

import jakarta.transaction.Transactional;

@Repository
public interface SeatsDao extends JpaRepository<Seats, Long> {
	@Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = 'AVAILABLE'")
	List<Seats> findByFlightFlightIdAndSeatStatus(Long flightId, Seats.SeatStatus seatStatus);

    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.seatNumber IN :seatNumbers")
    List<Seats> findSeatsByFlightAndNumbers(@Param("flightId") Long flightId, @Param("seatNumbers") List<String> seatNumbers);

    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status  = 'AVAILABLLE' ")
    List<Seats> findByFlightFlightIdAndStatus(@Param("flightId") Long flightId, @Param("SeatStatus") SeatStatus available);


    @Query("SELECT COUNT(s) FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = com.example.demo.entity.Seats.SeatStatus.AVAILABLE")
    Long countAvailableSeats(@Param("flightId") Long flightId);
    
    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = 'AVAILABLE'")
    List<Seats> getAvailableSeats(@Param("flightId") Long flightId);
    
//    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = com.example.demo.entity.Seats.SeatStatus.AVAILABLE")
//    List<Seats> findAvailableSeatsByFlightId(@Param("flightId") Long flightId);

//    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = 'Available'")
//    List<Seats> findAvailableSeatsByFlightId(@Param("flightId") Long flightId);

    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = 'AVAILABLE'")
    List<Seats> findAvailableSeatsByFlightId(@Param("flightId") Long flightId);


    @Query("SELECT s FROM Seats s WHERE s.flight.flightId = :flightId AND s.status = 'BOOKED'")
    List<Seats> findBookedSeatsByFlightId(@Param("flightId") Long flightId);

	}

