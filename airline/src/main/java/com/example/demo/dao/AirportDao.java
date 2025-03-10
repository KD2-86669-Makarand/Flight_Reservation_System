package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Airport;

public interface AirportDao extends JpaRepository<Airport, Long> {

}
