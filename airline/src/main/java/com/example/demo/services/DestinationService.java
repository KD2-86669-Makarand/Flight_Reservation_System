package com.example.demo.services;

import com.example.demo.dto.DestinationDTO;
import com.example.demo.entity.Destination;

import java.util.List;

import com.example.demo.dto.ApiResponse;

public interface DestinationService {
    ApiResponse addDestination(DestinationDTO destinationDTO);
    List<Destination> getAllDestination();
}
