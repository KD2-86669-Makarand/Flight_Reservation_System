package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Schedule;

public interface ScheduleDao extends JpaRepository<Schedule, Long> 
{

}
