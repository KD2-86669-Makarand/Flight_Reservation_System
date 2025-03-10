package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Passenger;

@Repository
public interface PassengerDao extends JpaRepository<Passenger, Long> {
	Optional<Passenger> findByEmail(String email);
}
