package com.example.demo.dto;

import java.time.LocalDateTime;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Payment.PaymentMethod;
import com.example.demo.entity.Payment.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO 
{
	private Long paymentId;

	private float amount;
	
	private LocalDateTime paymentDate;

	private PaymentMethod paymentMethod;

	private PaymentStatus status;

	private Long booking;
	
    private Long flightId;
    
    private Long seatId;

}
