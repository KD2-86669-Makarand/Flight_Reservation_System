package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Airlines;

public interface AirlineDao extends JpaRepository<Airlines, Long> 
{
	

}
