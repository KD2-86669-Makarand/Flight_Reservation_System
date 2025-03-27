package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Flight;

@Repository
public interface BookingDao extends JpaRepository<Booking, Long> {
	List<Booking> findByFlight(Flight flight);

}
