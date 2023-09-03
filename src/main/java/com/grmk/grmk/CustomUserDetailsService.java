package com.grmk.grmk;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.grmk.grmk.entities.Role;
import com.grmk.grmk.entities.Utilisateur;
import com.grmk.grmk.services.RoleService;
import com.grmk.grmk.services.UtilisateurService;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UtilisateurService userService;
	@Autowired
	private RoleService rolerService;
	
	@Override
	public UserDetails loadUserByUsername(String matricule) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		if (matricule.trim().isEmpty()) {
			throw new UsernameNotFoundException("username is empty");
		}

		Utilisateur user = userService.findByMatricule(matricule);
		
		if (user == null ) {
			
			throw new UsernameNotFoundException("User " + matricule + " not found");
		}

		return new org.springframework.security.core.userdetails.User(user.getMatricule(), user.getNomPersonne(),
				getGrantedAuthorities(user));
	}

	private List<GrantedAuthority> getGrantedAuthorities(Utilisateur user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		Role role=user.getRole();
		//if(user.getRole()==null) role=rolerService.findByRoleName("DEFAULT"); 
	//	else  role = user.getRole();
		authorities.add(new SimpleGrantedAuthority(role.getType()));
		return authorities;
	}

}
