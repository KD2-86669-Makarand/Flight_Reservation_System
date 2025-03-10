package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AirlineDTO {	
    private Long airlineId;
    private String airlineName;
    private String airlineCode;
    private String country;
    private Status status;

    public enum Status {
        ACTIVE,
        INACTIVE;
    }
}
