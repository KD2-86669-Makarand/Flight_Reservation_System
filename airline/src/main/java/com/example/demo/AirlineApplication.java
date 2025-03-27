package com.example.demo;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.services.PaymentService;
import com.example.demo.services.PaymentServiceImpl;

//@SpringBootApplication
@SpringBootApplication(scanBasePackages = "com.example.demo")
public class AirlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirlineApplication.class, args);
	}

	
	
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper(); // creating empty model mapper
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)// prop names n data type must match
																				// between src n dest
				.setPropertyCondition(Conditions.isNotNull());// DO NOT transfer nulls from src ->dest
		return mapper;
	}
	
	@Bean
    public PaymentService paymentService() {
        return new PaymentServiceImpl();
    }
}
