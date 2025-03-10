package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.custom_exception.ApiException;
import com.example.demo.dao.FlightDao;
import com.example.demo.dao.PassengerDao;
import com.example.demo.dao.SeatsDao;
import com.example.demo.dao.UserDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserRespDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Flight;
import com.example.demo.entity.Passenger;
import com.example.demo.entity.Seats;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserRole;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class UserServiceImpl  implements UserService{
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private FlightDao flightDao;
	
	@Autowired
	private PassengerDao passengerDao;

	@Autowired
	private SeatsDao seatsDao;
	
	@Autowired
	private ModelMapper modelMapper;


	
	@Override
	public ResponseEntity<?> signIn(AuthRequest dto) {
	    UserEntity userEntity = userDao.
	            findByEmailAndPassword(dto.getEmail(), dto.getPassword())
	            .orElseThrow(() -> new ApiException("Invalid Email or password !!!!!"));

	    // Convert entity to DTO
	    UserRespDTO userDto = modelMapper.map(userEntity, UserRespDTO.class);
	    userDto.setRole(userEntity.getRole().name()); // Ensure role is set

	    // Return user and token
	    Map<String, Object> response = new HashMap<>();
	    response.put("user", userDto);
	    response.put("token", "fake-jwt-token"); // Replace with actual token logic

	    return ResponseEntity.ok(response);
	}


	@Override
	public ApiResponse addUser(UserDTO user) {
		UserEntity userEntity=modelMapper.map(user,UserEntity.class);
		userEntity.setRole(UserRole.ROLE_ADMIN);
		UserEntity persistentUser=userDao.save(userEntity);
		return new ApiResponse("Added new user with ID="
				+ persistentUser.getId());
	}

	@Override
	public ApiResponse updateUser(Long userId, UserDTO userDto) {
		
	    UserEntity existingUser = userDao.findById(userId)
	            .orElseThrow(() -> new ApiException("User not found with ID: " + userId));

	   
	    modelMapper.map(userDto, existingUser);

	   
	    UserEntity updatedUser = userDao.save(existingUser);

	    return new ApiResponse("User updated successfully with ID: " + updatedUser.getId());
	}

	@Override
	public ApiResponse softDeleteUser(Long userId) {
	    UserEntity user = userDao.findById(userId)
	            .orElseThrow(() -> new ApiException("User not found with ID: " + userId));

	    if (user.getStatus() == UserEntity.Status.INACTIVE) {
	        throw new ApiException("User is already inactive!");
	    }

	    user.setStatus(UserEntity.Status.INACTIVE);
	    userDao.save(user);

	    return new ApiResponse("User with ID: " + userId + " has been marked as inactive.");
	}

public List<UserRespDTO> getAllUser(){
	return userDao.findAll().stream().map(user->modelMapper.map(user, UserRespDTO.class))
			.collect(Collectors.toList());
}
	
}
