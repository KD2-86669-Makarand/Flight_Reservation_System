package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SeatBooking;

public interface SeatBookingDao extends JpaRepository<SeatBooking, Long>
{

}
