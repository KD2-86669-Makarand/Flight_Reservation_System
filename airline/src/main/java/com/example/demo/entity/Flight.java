package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FlightId")
    private Long flightId;

    @ManyToOne
    @JoinColumn(name = "AirlineId", referencedColumnName = "AirlineId", nullable = false)
    private Airlines airline;

    @ManyToOne
    @JoinColumn(name = "AircraftId", referencedColumnName = "AircraftId", nullable = false)
    private Aircraft aircraft;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SourceId", referencedColumnName = "SourceId", nullable = false)
    private Source source;
    
    @Column(name = "departure_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime departureTime;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DestinationId", referencedColumnName = "DestinationId", nullable = false)
    private Destination destination;
    
    @Column(name = "arrival_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")  // ✅ Forces JSON to be HH:mm
    private LocalDateTime arrivalTime;  // ✅ Stores only Time (HH:mm)

    @Column(name = "IsDirect", nullable = false)
    private boolean isDirect;
    
    @Column(name = "Distance", nullable = false)
    private Float distance;

    @Column(name = "Duration", nullable = false)
    private String duration;

    @Column(name = "Price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "TotalSeats", nullable = false)
    private int totalSeats;
    
}