package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Source;

public interface SourceDao extends JpaRepository<Source, Long> {

}
