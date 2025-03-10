package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@Table(name="User")
@Entity
public class UserEntity extends BaseEntity {
	@Column(name = "first_name", length = 20) 
	private String firstName;
	@Column(name = "last_name", length = 20) 
	private String lastName;
	@Column(length = 25, unique = true) 
	private String email;
	@Column(length = 500) 
	private String password;
	private LocalDate dob;
	
	//private String country ;
	@Enumerated(EnumType.STRING) 
	
	@Column(length = 30) 
	
	
	private UserRole role;
	
	@Column(length=20)
	private Status status;
	
	public enum Status {
        ACTIVE,
        INACTIVE
    }
	
	@PrePersist
    private void setDefaultStatus() {
        if (this.status == null) {
            this.status = Status.ACTIVE; 
        }
	}
}
