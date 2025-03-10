package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.dto.DestinationDTO;
import com.example.demo.dto.SourceDTO;
import com.example.demo.entity.Destination;
import com.example.demo.entity.Source;
import com.example.demo.dto.ApiResponse;
import com.example.demo.services.DestinationService;

@RestController
@RequestMapping("/destination")
@CrossOrigin(origins = "http://localhost:3000")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @PostMapping("/addDestination")
    public ResponseEntity<ApiResponse> addSource(@RequestBody DestinationDTO destinationDTO) {
        try {
			ApiResponse apiResponse = destinationService.addDestination(destinationDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error: " + e.getMessage()));
		}
    }
    
    @GetMapping("/getAllDestination")
    public ResponseEntity<List<Destination>> getAllDestination() {
        List<Destination> destination = destinationService.getAllDestination();
        return ResponseEntity.ok(destination);
    }
}
