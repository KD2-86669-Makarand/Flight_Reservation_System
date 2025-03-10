	package com.example.demo.entity;
	
	import java.time.LocalDateTime;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.EnumType;
	import jakarta.persistence.Enumerated;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.OneToOne;
	import jakarta.persistence.Table;
	import lombok.AllArgsConstructor;
	import lombok.Getter;
	import lombok.NoArgsConstructor;
	import lombok.Setter;
	
	@Entity
	@Table(name = "Payment")
	@NoArgsConstructor
	@AllArgsConstructor
	@Setter
	@Getter
	public class Payment {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "paymentId")
		private Long paymentId;
	
		@Column(name = "Amount")
		private float amount;
	
		@Column(name = "PaymentDate")
		private LocalDateTime paymentDate;
	
		@Enumerated(EnumType.STRING)
		@Column(name = "PaymentMethod")
		private PaymentMethod paymentMethod;
	
		@Enumerated(EnumType.STRING)
		@Column(name = "Status")
		private PaymentStatus status;
	
		@OneToOne
		@JoinColumn(name = "BookingId", referencedColumnName = "BookingId")
		private Booking booking;
	
		public enum PaymentMethod {
			CREDITCARD, DEBITCARD, PAYPAL, UPI
		}
	
		public enum PaymentStatus {
			PAID, CANCEL
		}
	}
