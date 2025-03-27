package com.example.demo.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Flight;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmailService {
	@Autowired
    private JavaMailSender mailSender;
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("✈️ Booking Confirmation - Airline Reservation System");
//
//	        // Email Body with Better Styling
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html>\n" +
//	                "<head>\n" +
//	                "    <style>\n" +
//	                "        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }\n" +
//	                "        .container { width: 60%; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }\n" +
//	                "        h1 { color: #333; text-align: center; }\n" +
//	                "        .details { padding: 15px; background-color: #eaf4ff; border-radius: 6px; margin-top: 20px; }\n" +
//	                "        p { font-size: 14px; line-height: 1.6; color: #555; }\n" +
//	                "        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #999; }\n" +
//	                "        .highlight { color: #2a7ae2; font-weight: bold; }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <h1>✅ Booking Confirmed!</h1>\n" +
//	                "        <p>Dear <strong>" + passengerName + "</strong>,</p>\n" +
//	                "        <p>Your flight has been successfully booked. Below are the flight details:</p>\n" +
//	                "\n" +
//	                "        <div class=\"details\">\n" +
//	                "            <p><strong>Source:</strong> <span class=\"highlight\">" + source + "</span></p>\n" +
//	                "            <br/>" +
//	                "            <p><strong>Destination:</strong> <span class=\"highlight\">" + destination + "</span></p>\n" +
//	                "            <br/>" +
//	                "            <p><strong>Departure Time:</strong> <span class=\"highlight\">" + departureTime + "</span></p>\n" +
//	                "            <br/>" +
//	                "            <p><strong>Seat Number:</strong> <span class=\"highlight\">" + seatNumber + "</span></p>\n" +
//	                "        </div>\n" +
//	                "\n" +
//	                "        <p>Thank you for choosing <strong>MB Airways</strong>.</p>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <p>&copy; 2025 MB Airways. All rights reserved.</p>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // ✅ Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName) {
//        try {
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//            helper.setTo(to);
//            helper.setSubject("✈️ Booking Confirmation - Airline Reservation System");
//
//            // Email Body with Better Styling
//            String emailContent = "<!DOCTYPE html>\n" +
//                    "<html>\n" +
//                    "<head>\n" +
//                    "    <style>\n" +
//                    "        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }\n" +
//                    "        .container { width: 60%; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }\n" +
//                    "        h1 { color: #333; text-align: center; }\n" +
//                    "        .details { padding: 15px; background-color: #eaf4ff; border-radius: 6px; margin-top: 20px; }\n" +
//                    "        p { font-size: 14px; line-height: 1.6; color: #555; }\n" +
//                    "        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #999; }\n" +
//                    "        .highlight { color: #2a7ae2; font-weight: bold; }\n" +
//                    "    </style>\n" +
//                    "</head>\n" +
//                    "<body>\n" +
//                    "    <div class=\"container\">\n" +
//                    "        <h1>✅ Booking Confirmed!</h1>\n" +
//                    "        <p>Dear <strong>" + passengerName + "</strong>,</p>\n" +
//                    "        <p>Your flight has been successfully booked. Below are the flight details:</p>\n" +
//                    "\n" +
//                    "        <div class=\"details\">\n" +
//                    "            <p><strong>Source:</strong> <span class=\"highlight\">" + source + "</span></p>\n" +
//                    "            <p><strong>Destination:</strong> <span class=\"highlight\">" + destination + "</span></p>\n" +
//                    "            <p><strong>Departure Time:</strong> <span class=\"highlight\">" + departureTime + "</span></p>\n" +
//                    "            <p><strong>Seat Number:</strong> <span class=\"highlight\">" + seatNumber + "</span></p>\n" +
//                    "        </div>\n" +
//                    "\n" +
//                    "        <p>Thank you for choosing <strong>MB Airways</strong>.</p>\n" +
//                    "        <div class=\"footer\">\n" +
//                    "            <p>&copy; 2025 MB Airways. All rights reserved.</p>\n" +
//                    "        </div>\n" +
//                    "    </div>\n" +
//                    "</body>\n" +
//                    "</html>";
//
//            helper.setText(emailContent, true); // ✅ Send as HTML
//            mailSender.send(message);
//
//        } catch (MessagingException e) {
//            throw new RuntimeException("Error sending email: " + e.getMessage());
//        }
//    }
	
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("✈️ Booking Confirmation - MB Airways");
//
//	        // Enhanced Email Body
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html lang=\"en\">\n" +
//	                "<head>\n" +
//	                "    <meta charset=\"UTF-8\">\n" +
//	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//	                "    <style>\n" +
//	                "        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; line-height: 1.6; }\n" +
//	                "        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }\n" +
//	                "        h1 { color: #1a3c6d; text-align: center; font-size: 24px; margin-bottom: 20px; }\n" +
//	                "        .details { background-color: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2a7ae2; }\n" +
//	                "        p { font-size: 14px; color: #333; margin: 10px 0; }\n" +
//	                "        .highlight { color: #2a7ae2; font-weight: bold; }\n" +
//	                "        .footer { font-size: 12px; text-align: center; color: #777; margin-top: 20px; }\n" +
//	                "        .cta-button { display: inline-block; padding: 10px 20px; background-color: #2a7ae2; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 15px; }\n" +
//	                "        @media (max-width: 600px) { .container { width: 90%; padding: 15px; } h1 { font-size: 20px; } }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <h1>✅ Your Flight is Confirmed!</h1>\n" +
//	                "        <p>Dear <strong>" + passengerName + "</strong>,</p>\n" +
//	                "        <p>Thank you for booking with <strong>MB Airways</strong>. Your flight details are below:</p>\n" +
//	                "        <div class=\"details\">\n" +
//	                "            <p><strong>From:</strong> <span class=\"highlight\">" + source + "</span></p>\n" +
//	                "            <p><strong>To:</strong> <span class=\"highlight\">" + destination + "</span></p>\n" +
//	                "            <p><strong>Departure:</strong> <span class=\"highlight\">" + departureTime + "</span></p>\n" +
//	                "            <p><strong>Seat:</strong> <span class=\"highlight\">" + seatNumber + "</span></p>\n" +
//	                "        </div>\n" +
//	                "        <p>We’re excited to have you on board! For more details or to manage your booking, click below:</p>\n" +
//	                "        <a href=\"https://mbairways.com/manage-booking\" class=\"cta-button\">Manage Booking</a>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <p>Need help? Contact us at <a href=\"mailto:support@mbairways.com\">support@mbairways.com</a></p>\n" +
//	                "            <p>© 2025 MB Airways. All rights reserved.</p>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}

//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("✈️ Booking Confirmation - MB Airways");
//
//	        // Email Body with Hyperlinked Email
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html lang=\"en\">\n" +
//	                "<head>\n" +
//	                "    <meta charset=\"UTF-8\">\n" +
//	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//	                "    <style>\n" +
//	                "        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; line-height: 1.6; }\n" +
//	                "        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }\n" +
//	                "        h1 { color: #1a3c6d; text-align: center; font-size: 24px; margin-bottom: 20px; }\n" +
//	                "        .details { background-color: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2a7ae2; }\n" +
//	                "        p { font-size: 14px; color: #333; margin: 10px 0; }\n" +
//	                "        .highlight { color: #2a7ae2; font-weight: bold; }\n" +
//	                "        .footer { font-size: 12px; text-align: center; colorователь: #777; margin-top: 20px; }\n" +
//	                "        .cta-button { display: inline-block; padding: 10px 20px; background-color: #2a7ae2; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 15px; }\n" +
//	                "        a { color: #2a7ae2; text-decoration: none; }\n" +
//	                "        a:hover { text-decoration: underline; }\n" +
//	                "        @media (max-width: 600px) { .container { width: 90%; padding: 15px; } h1 { font-size: 20px; } }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <h1>✅ Your Flight is Confirmed!</h1>\n" +
//	                "        <p>Dear <strong>" + passengerName + "</strong>,</p>\n" +
//	                "        <p>Thank you for booking with <strong>MB Airways</strong>. Your flight details are below:</p>\n" +
//	                "        <div class=\"details\">\n" +
//	                "            <p><strong>From:</strong> <span class=\"highlight\">" + source + "</span></p>\n" +
//	                "            <p><strong>To:</strong> <span class=\"highlight\">" + destination + "</span></p>\n" +
//	                "            <p><strong>Departure:</strong> <span class=\"highlight\">" + departureTime + "</span></p>\n" +
//	                "            <p><strong>Seat:</strong> <span class=\"highlight\">" + seatNumber + "</span></p>\n" +
//	                "        </div>\n" +
//	                "        <p>We’re excited to have you on board! For more details or to manage your booking, click below:</p>\n" +
//	                "        <a href=\"https://mbairways.com/manage-booking\" class=\"cta-button\">Manage Booking</a>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <p>Need help? Contact us at <a href=\"mailto:mbairways3103@gmail.com\">support@mbairways.com</a></p>\n" +
//	                "            <p>© 2025 MB Airways. All rights reserved.</p>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName, BigDecimal amount, Class<? extends Flight> seatClass) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("Flight Booking Confirmation - MB Airways");
//
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html lang=\"en\">\n" +
//	                "<head>\n" +
//	                "    <meta charset=\"UTF-8\">\n" +
//	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//	                "    <style>\n" +
//	                "        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; line-height: 1.6; color: #333; }\n" +
//	                "        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }\n" +
//	                "        .header { background-color: #1a3c6d; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }\n" +
//	                "        .header h1 { margin: 0; font-size: 22px; font-weight: 300; }\n" +
//	                "        .content { padding: 25px 20px; }\n" +
//	                "        .booking-details { background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px; margin: 20px 0; }\n" +
//	                "        .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; }\n" +
//	                "        .detail-label { font-weight: 600; color: #495057; }\n" +
//	                "        .detail-value { color: #2c3e50; }\n" +
//	                "        .footer { text-align: center; font-size: 12px; color: #6c757d; padding-top: 20px; border-top: 1px solid #e9ecef; }\n" +
//	                "        .contact-info { margin-top: 15px; }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <div class=\"header\">\n" +
//	                "            <h1>Flight Booking Confirmation</h1>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"content\">\n" +
//	                "            <p>Dear " + passengerName + ",</p>\n" +
//	                "            <p>Your flight booking with MB Airways has been confirmed. Please find the details below:</p>\n" +
//	                "            \n" +
//	                "            <div class=\"booking-details\">\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Passenger Name</span>\n" +
//	                "                    <span class=\"detail-value\">" + passengerName + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure</span>\n" +
//	                "                    <span class=\"detail-value\">" + source + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Destination</span>\n" +
//	                "                    <span class=\"detail-value\">" + destination + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure Time</span>\n" +
//	                "                    <span class=\"detail-value\">" + departureTime + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Seat Number</span>\n" +
//	                "                    <span class=\"detail-value\">" + seatNumber + "</span>\n" +
//	                "                </div>\n" +
//	                "            </div>\n" +
//	                "            \n" +
//	                "            <p>If you have any questions about your booking, please contact our customer support team.</p>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <div class=\"contact-info\">\n" +
//	                "                Customer Support: support@mbairways.com<br>\n" +
//	                "                © 2025 MB Airways. All rights reserved.\n" +
//	                "            </div>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}
	
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName, BigDecimal amount, Class<? extends Flight> seatClass) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("✈️ Flight Booking Confirmation - MB Airways");
//
//	        // Email Body with New Parameters and Hyperlinked Email
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html lang=\"en\">\n" +
//	                "<head>\n" +
//	                "    <meta charset=\"UTF-8\">\n" +
//	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//	                "    <style>\n" +
//	                "        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; line-height: 1.6; color: #333; }\n" +
//	                "        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }\n" +
//	                "        .header { background-color: #1a3c6d; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }\n" +
//	                "        .header h1 { margin: 0; font-size: 22px; font-weight: 300; }\n" +
//	                "        .content { padding: 25px 20px; }\n" +
//	                "        .booking-details { background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 20px; margin: 20px 0; }\n" +
//	                "        .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; }\n" +
//	                "        .detail-label { font-weight: 600; color: #495057; }\n" +
//	                "        .detail-value { color: #2c3e50; }\n" +
//	                "        .footer { text-align: center; font-size: 12px; color: #6c757d; padding-top: 20px; border-top: 1px solid #e9ecef; }\n" +
//	                "        .contact-info { margin-top: 15px; }\n" +
//	                "        a { color: #1a3c6d; text-decoration: none; }\n" +
//	                "        a:hover { text-decoration: underline; }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <div class=\"header\">\n" +
//	                "            <h1>Flight Booking Confirmation</h1>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"content\">\n" +
//	                "            <p>Dear " + passengerName + ",</p>\n" +
//	                "            <p>Your flight booking with MB Airways has been confirmed. Please find the details below:</p>\n" +
//	                "            <div class=\"booking-details\">\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Passenger Name : </span>\n" + " " +
//	                "                    <span class=\"detail-value\">" + passengerName + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure : </span>\n" + " " +
//	                "                    <span class=\"detail-value\">" + source + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Destination : </span>\n" + " " + 
//	                "                    <span class=\"detail-value\">" + destination + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure Time : </span>\n" + " " + 
//	                "                    <span class=\"detail-value\">" + departureTime + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Seat Number : </span>\n" + " " + 
//	                "                    <span class=\"detail-value\">" + seatNumber + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Seat Class : </span>\n" + " " + 
//	                "                    <span class=\"detail-value\">" + " Economy" + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Total Amount </span>\n" +
//	                "                    <span class=\"detail-value\"> ₹ : " + amount.toString() + "</span>\n" +
//	                "                </div>\n" +
//	                "            </div>\n" +
//	                "            <p>If you have any questions about your booking, please contact our customer support team.</p>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <div class=\"contact-info\">\n" +
//	                "                Customer Support: <a href=\"mailto:mbairways3103@gmail.com\">support@mbairways.com</a><br>\n" +
//	                "                © 2025 MB Airways. All rights reserved.\n" +
//	                "            </div>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}
	
//	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName, BigDecimal amount, Class<? extends Flight> seatClass) {
//	    try {
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//	        helper.setTo(to);
//	        helper.setSubject("Flight Booking Confirmation - MB Airways");
//
//	        String seatClassName = determineSeatClassName(seatClass);
//
//	        String emailContent = "<!DOCTYPE html>\n" +
//	                "<html lang=\"en\">\n" +
//	                "<head>\n" +
//	                "    <meta charset=\"UTF-8\">\n" +
//	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//	                "    <style>\n" +
//	                "        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f0f2f5; line-height: 1.6; color: #2c3e50; }\n" +
//	                "        .container { max-width: 650px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; }\n" +
//	                "        .header { background-color: #0a4f93; color: white; padding: 20px; text-align: center; }\n" +
//	                "        .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; }\n" +
//	                "        .content { padding: 30px; }\n" +
//	                "        .booking-details { background-color: #f4f6f9; border: 1px solid #e1e8f0; border-radius: 8px; padding: 25px; margin: 25px 0; }\n" +
//	                "        .detail-row { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e9ecef; }\n" +
//	                "        .detail-row:last-child { border-bottom: none; }\n" +
//	                "        .detail-label { font-weight: 600; color: #34495e; min-width: 150px; }\n" +
//	                "        .detail-value { color: #2c3e50; text-align: right; font-weight: 500; }\n" +
//	                "        .footer { background-color: #f4f6f9; text-align: center; padding: 20px; font-size: 12px; color: #7f8c8d; }\n" +
//	                "        .contact-info { margin-top: 10px; }\n" +
//	                "        a { color: #0a4f93; text-decoration: none; }\n" +
//	                "        a:hover { text-decoration: underline; }\n" +
//	                "        .total-amount { font-size: 18px; color: #0a4f93; font-weight: bold; }\n" +
//	                "    </style>\n" +
//	                "</head>\n" +
//	                "<body>\n" +
//	                "    <div class=\"container\">\n" +
//	                "        <div class=\"header\">\n" +
//	                "            <h1>Flight Booking Confirmation</h1>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"content\">\n" +
//	                "            <p>Dear " + passengerName + ",</p>\n" +
//	                "            <p>Your flight booking with MB Airways has been successfully confirmed. Below are the details of your reservation:</p>\n" +
//	                "            <div class=\"booking-details\">\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Passenger Name</span>\n" +
//	                "                    <span class=\"detail-value\">" + passengerName + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure</span>\n" +
//	                "                    <span class=\"detail-value\">" + source + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Destination</span>\n" +
//	                "                    <span class=\"detail-value\">" + destination + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Departure Time</span>\n" +
//	                "                    <span class=\"detail-value\">" + departureTime + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Seat Number</span>\n" +
//	                "                    <span class=\"detail-value\">" + seatNumber + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Seat Class</span>\n" +
//	                "                    <span class=\"detail-value\">" + seatClassName + "</span>\n" +
//	                "                </div>\n" +
//	                "                <div class=\"detail-row\">\n" +
//	                "                    <span class=\"detail-label\">Total Amount</span>\n" +
//	                "                    <span class=\"detail-value total-amount\">₹ " + String.format("%,.2f", amount) + "</span>\n" +
//	                "                </div>\n" +
//	                "            </div>\n" +
//	                "            <p>We appreciate your business and look forward to providing you with an exceptional travel experience.</p>\n" +
//	                "        </div>\n" +
//	                "        <div class=\"footer\">\n" +
//	                "            <div class=\"contact-info\">\n" +
//	                "                Need assistance? Contact our support team at <a href=\"mailto:support@mbairways.com\">support@mbairways.com</a><br>\n" +
//	                "                © 2025 MB Airways. All rights reserved.\n" +
//	                "            </div>\n" +
//	                "        </div>\n" +
//	                "    </div>\n" +
//	                "</body>\n" +
//	                "</html>";
//
//	        helper.setText(emailContent, true); // Send as HTML
//	        mailSender.send(message);
//
//	    } catch (MessagingException e) {
//	        throw new RuntimeException("Error sending email: " + e.getMessage());
//	    }
//	}
//
//	// Helper method to determine seat class name
//	private String determineSeatClassName(Class<? extends Flight> seatClass) {
//	    if (seatClass == null) {
//	        return "Economy";
//	    }
//	    String className = seatClass.getSimpleName();
//	    switch (className) {
//	        case "BusinessFlight":
//	            return "Business";
//	        case "FirstClassFlight":
//	            return "First Class";
//	        case "PremiumEconomyFlight":
//	            return "Premium Economy";
//	        default:
//	            return "Economy";
//	    }
//	}
	
	
	
	public void sendBookingConfirmation(String to, String source, String destination, String departureTime, String seatNumber, String passengerName, BigDecimal amount, Class<? extends Flight> seatClass) {
	    try {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);

	        helper.setTo(to);
	        helper.setSubject("Flight Booking Confirmation - MB Airways");

	        String seatClassName = determineSeatClassName(seatClass);

	        String emailContent = "<!DOCTYPE html>\n" +
	                "<html lang=\"en\">\n" +
	                "<head>\n" +
	                "    <meta charset=\"UTF-8\">\n" +
	                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
	                "    <style>\n" +
	                "        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f0f2f5; line-height: 1.5; color: #2c3e50; font-size: 14px; }\n" +
	                "        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); overflow: hidden; }\n" +
	                "        .header { background-color: #0a4f93; color: white; padding: 15px; text-align: center; }\n" +
	                "        .header h1 { margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 0.5px; }\n" +
	                "        .content { padding: 20px; }\n" +
	                "        .booking-details { background-color: #f4f6f9; border: 1px solid #e1e8f0; border-radius: 6px; padding: 20px; margin: 20px 0; }\n" +
	                "        .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e9ecef; font-size: 13px; }\n" +
	                "        .detail-row:last-child { border-bottom: none; }\n" +
	                "        .detail-label { font-weight: 600; color: #34495e; min-width: 120px; }\n" +
	                "        .detail-value { color: #2c3e50; text-align: right; font-weight: 500; }\n" +
	                "        .footer { background-color: #f4f6f9; text-align: center; padding: 15px; font-size: 11px; color: #7f8c8d; }\n" +
	                "        .contact-info { margin-top: 8px; }\n" +
	                "        a { color: #0a4f93; text-decoration: none; }\n" +
	                "        a:hover { text-decoration: underline; }\n" +
	                "        .total-amount { font-size: 16px; color: #0a4f93; font-weight: bold; }\n" +
	                "        @media only screen and (max-width: 480px) {\n" +
	                "            body { font-size: 13px; }\n" +
	                "            .container { width: 95%; margin: 10px auto; }\n" +
	                "            .header h1 { font-size: 18px; }\n" +
	                "            .detail-row { flex-direction: column; align-items: flex-start; }\n" +
	                "            .detail-label, .detail-value { width: 100%; margin-bottom: 5px; }\n" +
	                "        }\n" +
	                "    </style>\n" +
	                "</head>\n" +
	                "<body>\n" +
	                "    <div class=\"container\">\n" +
	                "        <div class=\"header\">\n" +
	                "            <h1>Flight Booking Confirmation</h1>\n" +
	                "        </div>\n" +
	                "        <div class=\"content\">\n" +
	                "            <p>Dear " + passengerName + ",</p>\n" +
	                "            <p>Your flight booking with MB Airways has been successfully confirmed. Below are the details of your reservation:</p>\n" +
	                "            <div class=\"booking-details\">\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Passenger Name</span>\n" +
	                "                    <span class=\"detail-value\">" + passengerName + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Departure</span>\n" +
	                "                    <span class=\"detail-value\">" + source + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Destination</span>\n" +
	                "                    <span class=\"detail-value\">" + destination + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Departure Time</span>\n" +
	                "                    <span class=\"detail-value\">" + departureTime + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Seat Number</span>\n" +
	                "                    <span class=\"detail-value\">" + seatNumber + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Seat Class</span>\n" +
	                "                    <span class=\"detail-value\">" + seatClassName + "</span>\n" +
	                "                </div>\n" +
	                "                <div class=\"detail-row\">\n" +
	                "                    <span class=\"detail-label\">Total Amount</span>\n" +
	                "                    <span class=\"detail-value total-amount\">₹ " + String.format("%,.2f", amount) + "</span>\n" +
	                "                </div>\n" +
	                "            </div>\n" +
	                "            <p>We appreciate your business and look forward to providing you with an exceptional travel experience.</p>\n" +
	                "        </div>\n" +
	                "        <div class=\"footer\">\n" +
	                "            <div class=\"contact-info\">\n" +
	                "                Need assistance? Contact our support team at <a href=\"mailto:mbairways3103@gmail.com\">support@mbairways.com</a><br>\n" +
	                "                © 2025 MB Airways. All rights reserved.\n" +
	                "            </div>\n" +
	                "        </div>\n" +
	                "    </div>\n" +
	                "</body>\n" +
	                "</html>";

	        helper.setText(emailContent, true); // Send as HTML
	        mailSender.send(message);

	    } catch (MessagingException e) {
	        throw new RuntimeException("Error sending email: " + e.getMessage());
	    }
	}

	// Helper method to determine seat class name
	private String determineSeatClassName(Class<? extends Flight> seatClass) {
	    if (seatClass == null) {
	        return "Economy";
	    }
	    String className = seatClass.getSimpleName();
	    switch (className) {
	        case "BusinessFlight":
	            return "Business";
	        case "FirstClassFlight":
	            return "First Class";
	        case "PremiumEconomyFlight":
	            return "Premium Economy";
	        default:
	            return "Economy";
	    }
	}
	
	
}


