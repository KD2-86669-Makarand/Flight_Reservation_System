package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AirportDTO;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.SourceDTO;
import com.example.demo.entity.Source;
import com.example.demo.services.SourceService;

@RestController
@RequestMapping("/source")
@CrossOrigin(origins = "http://localhost:3000")
public class SourceController {
	
	@Autowired
	private SourceService sourceService;
	
	 @PostMapping("/addSource")
	    public ResponseEntity<ApiResponse> addSource(@RequestBody SourceDTO sourceDTO) {
	        try {
				ApiResponse apiResponse = sourceService.addSource(sourceDTO);
				return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse("Error: " + e.getMessage()));
			}
	        
	 }
	 
	 @GetMapping("/getAllSource")
	    public ResponseEntity<List<Source>> getAllSources() {
	        List<Source> sources = sourceService.getAllSource();
	        return ResponseEntity.ok(sources);
	    }
	 
}
