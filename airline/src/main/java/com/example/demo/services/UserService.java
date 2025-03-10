 package com.example.demo.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.BookingDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserRespDTO;
import com.example.demo.entity.UserEntity;

public interface UserService {
	ApiResponse addUser(UserDTO user);
	ApiResponse updateUser(Long userId,UserDTO userDto);//update user
	public ApiResponse softDeleteUser(Long userId); //softdelete of user

	public List<UserRespDTO> getAllUser();
	public ResponseEntity<?> signIn(AuthRequest dto); //to login on role based
	
}
