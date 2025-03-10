package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DestinationDTO {

	private LocalDate arrivalDate;  // ✅ Accepts only Date (YYYY-MM-DD)

    private Long airport;  // ✅ Foreign key (Airport ID)
}
