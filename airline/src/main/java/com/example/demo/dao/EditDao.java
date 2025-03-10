package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.UserEntity;

public interface EditDao extends JpaRepository<UserEntity, Long> {

}
