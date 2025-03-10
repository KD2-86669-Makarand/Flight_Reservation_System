package com.example.demo.services;

import com.example.demo.dao.AirportDao;
import com.example.demo.dao.SourceDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.SourceDTO;
import com.example.demo.entity.Airlines;
import com.example.demo.entity.Airport;
import com.example.demo.entity.Source;

import jakarta.transaction.Transactional;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SourceServiceImpl implements SourceService {

    @Autowired
    private SourceDao sourceDao;

    @Autowired
    private AirportDao airportDao;

    @Autowired
    private ModelMapper modelMapper;
    
    public ApiResponse addSource(SourceDTO sourceDTO) {
        Airport airport = airportDao.findById(sourceDTO.getAirport())
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        // ✅ Use ModelMapper to map DTO to Entity
        Source source = modelMapper.map(sourceDTO, Source.class);
        source.setAirport(airport); // ✅ Ensure airport entity is set

        Source savedSource =  sourceDao.save(source);

        return new ApiResponse("Source added successfully with ID : " + savedSource.getSourceId());
    }

	@Override
	public List<Source> getAllSource() {
		return sourceDao.findAll();
	}
    

}
