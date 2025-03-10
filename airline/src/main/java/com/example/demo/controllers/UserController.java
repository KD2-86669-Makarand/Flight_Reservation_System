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

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserRespDTO;
import com.example.demo.entity.UserEntity;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
	private UserService userService;
	
    @PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody AuthRequest dto)
	{
		System.out.println("in user sign in "+dto);
		try {
			return ResponseEntity.ok(userService.signIn(dto));
		} catch (RuntimeException e) {
		
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ApiResponse(e.getMessage()));
		}
	}
    
    @PostMapping("/add")
	public ResponseEntity<?> addUser
	(@RequestBody UserDTO user) {
		System.out.println("in add user " + user);// transient category
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.addUser(user));
	}
    
    
    //update user 
    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable Long userId,@RequestBody UserDTO user)
    {
    	System.out.println("in update user " + userId + " " + user);
    
    return ResponseEntity.ok(userService.updateUser(userId, user));
    }
    
    
    @PutMapping("delete/{userId}/deactivate")
    public ResponseEntity<ApiResponse> deactivateUser(@PathVariable Long userId) {
        ApiResponse response = userService.softDeleteUser(userId);
        return ResponseEntity.ok(response);
    }
   
	
    
   	@GetMapping
   	public ResponseEntity<?> getUser() {
   		
   		List<UserRespDTO> user = 
   				userService.getAllUser();
   		if (user.isEmpty())
   			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
   		return ResponseEntity.ok(user);
   	}
    
}
