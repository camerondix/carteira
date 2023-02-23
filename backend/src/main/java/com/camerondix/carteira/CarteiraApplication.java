package com.camerondix.carteira;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.camerondix.carteira.service.PlaidService;

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableScheduling
public class CarteiraApplication {

	@Autowired
	private PlaidService plaidService;

	public static void main(String[] args) {
		SpringApplication.run(CarteiraApplication.class, args);
	}

	@Bean
	public ApplicationRunner applicationStartupRunner() {
		return new ApplicationRunner() {
			@Override
			public void run(ApplicationArguments args) throws Exception {
				plaidService.updateAll();
			}
		};
	}

}
