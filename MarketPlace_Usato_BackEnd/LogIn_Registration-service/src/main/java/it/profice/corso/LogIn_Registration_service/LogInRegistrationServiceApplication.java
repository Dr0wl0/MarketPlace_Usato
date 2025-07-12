package it.profice.corso.LogIn_Registration_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin("/http://localhost:4200")
public class LogInRegistrationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogInRegistrationServiceApplication.class, args);
	}

}
