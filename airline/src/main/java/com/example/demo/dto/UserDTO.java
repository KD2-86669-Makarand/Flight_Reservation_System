package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.entity.UserRole;
import com.example.demo.entity.UserEntity.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class UserDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private LocalDate dob;

}
