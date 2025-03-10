package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmailAndPassword(String em, String pass);
}
