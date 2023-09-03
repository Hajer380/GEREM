package com.grmk.grmk;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;


@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditingConfiguration {
	 public  Logger log = LoggerFactory.getLogger(JpaAuditingConfiguration.class);
	
	 @Bean
	    public AuditorAware<String> auditorProvider() {
	        return new AuditorAwareImpl();
	    }
	    
	    class AuditorAwareImpl implements AuditorAware<String> {
	    	 @Autowired
	 		@Qualifier("customUserDetailsService")
	 		private UserDetailsService customUserDetailsService;
	        @Override
	        public Optional<String> getCurrentAuditor() {
	        	 if (SecurityContextHolder.getContext().getAuthentication() != null) {
	        		
	        		 UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
	        	//	 UsernamePasswordAuthenticationToken auth = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
	        		 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	                //    Object principal = auth.getPrincipal();
	                    if (principal instanceof UserDetails) {
	                    	  String username = ((UserDetails)principal).getUsername();
	                    	  log.info("((UserDetails)principal).getUsername() : " + username);
	                    	  return  Optional.of( username);
	                    	} else {
	                    	  String username = principal.toString();
	                    	  log.info(" principal.toString(); : " + username);
	                    	  return  Optional.of( username);
	                    	}
	                   // UserDetails userDetails = (UserDetails) principal;
	                  //  String currently=userDetails.getUsername();
	                  //  log.info("info : " + username);
	                 //   return  Optional.of( username);
	        	 }
	        	 else
	            return Optional.of("SYSTEM");
	           
	        }
	        
	    }
   
    
    
}
	


