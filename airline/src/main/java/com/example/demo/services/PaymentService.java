package com.example.demo.services;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.PaymentDTO;

public interface PaymentService 
{
	 public ApiResponse processPayment(PaymentDTO paymentDTO);
}
