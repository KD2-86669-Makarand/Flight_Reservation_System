package com.example.demo.services;

import com.example.demo.dto.DestinationDTO;
import com.example.demo.dto.SourceDTO;
import com.example.demo.dao.AirportDao;
import com.example.demo.dao.DestinationDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.entity.Airport;
import com.example.demo.entity.Destination;
import com.example.demo.entity.Source;

import jakarta.transaction.Transactional;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service  
@Transactional
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    private DestinationDao destinationDao;

    @Autowired
    private AirportDao airportDao;

    @Autowired
    private ModelMapper modelMapper;

    public ApiResponse addDestination(DestinationDTO destinationDTO) {
        Airport airport = airportDao.findById(destinationDTO.getAirport())
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        // ✅ Use ModelMapper to map DTO to Entity
        Destination destination = modelMapper.map(destinationDTO, Destination.class);
        destination.setAirport(airport); // ✅ Ensure airport entity is set

        Destination savedDestination =  destinationDao.save(destination);

        return new ApiResponse("Destination added successfully with ID : " + savedDestination.getDestinationId());
    }

	@Override
	public List<Destination> getAllDestination() {
		return destinationDao.findAll();
	}
}
