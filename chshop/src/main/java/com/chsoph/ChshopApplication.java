package com.chsoph;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.chsoph.entity")
@EnableJpaRepositories("com.chsoph.repository")
public class ChshopApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChshopApplication.class, args);
	}
}