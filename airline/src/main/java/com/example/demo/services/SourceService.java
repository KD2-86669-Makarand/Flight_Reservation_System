package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.SourceDTO;
import com.example.demo.entity.Airport;
import com.example.demo.entity.Source;

public interface SourceService {
	public ApiResponse addSource(SourceDTO sourceDTO);

	List<Source> getAllSource();
	
}
