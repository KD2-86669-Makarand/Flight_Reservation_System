package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.entity.Passenger.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassengerDTO 
{
	private Long passengerId;
	private String firstName;
    private String lastName;
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private Gender gender;
    
    private String contactDetails;
    private Long userId;  // ✅ Only store userId instead of full entity
    private String passport;  // ✅ Optional field
}
