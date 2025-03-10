package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Destination")
public class Destination {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "destinationId")
    private Long destinationId;
	
    @ManyToOne
    @JoinColumn(name = "airportId", referencedColumnName = "airportId", nullable = false)
    private Airport airport;
}
