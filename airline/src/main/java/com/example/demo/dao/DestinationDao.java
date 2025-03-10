package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Destination;

public interface DestinationDao extends JpaRepository<Destination, Long> {

}
