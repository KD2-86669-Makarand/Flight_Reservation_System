package com.example.demo.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.BookingDao;
import com.example.demo.dao.PaymentDao;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.PaymentDTO;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Payment.PaymentMethod;
import com.example.demo.entity.Payment.PaymentStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService 
{	
	@Autowired
	private BookingDao bookingDao;
	
	@Autowired
	private PaymentDao paymentDao;
	
//	@Override
//	 public ApiResponse processPayment(PaymentDTO paymentDTO) {
//	        Booking booking = bookingDao.findById(paymentDTO.getBooking())
//	                .orElseThrow(() -> new RuntimeException("Booking not found"));
//
//	        // ✅ Create Payment Entry
//	        Payment payment = new Payment();
//	        payment.setAmount(paymentDTO.getAmount());
//	        payment.setPaymentDate(LocalDateTime.now());
//	        payment.setPaymentMethod(PaymentMethod.valueOf(paymentDTO.getPaymentMethod().name()));
//	        payment.setStatus(PaymentStatus.PAID);
//	        payment.setBooking(booking);
//
//	        paymentDao.save(payment);
//
//	        return new ApiResponse("✅ Payment successful for Booking ID: " + booking.getBookingId());
//	    }
	
	@Override
	public ApiResponse processPayment(PaymentDTO paymentDTO) {
        Booking booking = bookingDao.findById(paymentDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentMethod(PaymentMethod.valueOf(paymentDTO.getPaymentMethod().name()));
        payment.setStatus(PaymentStatus.PAID);
        payment.setBooking(booking);

        paymentDao.save(payment);

        return new ApiResponse("✅ Payment successful for Booking ID: " + booking.getBookingId());
    }
}
