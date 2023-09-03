package com.grmk.grmk;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.scheduling.annotation.EnableScheduling;


import javax.transaction.Transactional;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableAutoConfiguration
@EnableScheduling
public class GrmkApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(GrmkApplication.class, args);
	}
	@Transactional
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(GrmkApplication.class);

	}
}
