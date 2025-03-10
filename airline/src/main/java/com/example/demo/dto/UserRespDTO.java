package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.entity.UserRole;
import com.example.demo.entity.UserEntity.Status;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class UserRespDTO extends BaseDTO {
	private String firstName;
	private String lastName;
	private LocalDate dob;
	private String email;
	
	private Status status;
	private String role; // Make sure role is present

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}

