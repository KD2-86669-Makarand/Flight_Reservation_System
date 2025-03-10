package com.example.demo.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Flight;

@Repository
public interface FlightDao extends JpaRepository<Flight, Long> 
{
	@Query("SELECT f FROM Flight f WHERE f.source.sourceId = :sourceId AND f.destination.destinationId = :destinationId AND DATE(f.departureTime) = :departureDate")
	List<Flight> findFlightsBySourceDestinationAndDate(
	    @Param("sourceId") Long sourceId, 
	    @Param("destinationId") Long destinationId, 
	    @Param("departureDate") LocalDate departureDate);
}
