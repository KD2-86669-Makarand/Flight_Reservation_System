package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.services.PaymentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController 
{
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/process")
    public ResponseEntity<ApiResponse> processPayment(@RequestBody PaymentDTO paymentDTO) {
        ApiResponse response = paymentService.processPayment(paymentDTO);
        return ResponseEntity.ok(response);
    }
	
}
