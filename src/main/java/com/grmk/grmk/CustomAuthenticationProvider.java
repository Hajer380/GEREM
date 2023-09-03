package com.grmk.grmk;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.NamingException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.grmk.grmk.entities.Role;
import com.grmk.grmk.entities.Utilisateur;
import com.grmk.grmk.services.RoleService;
import com.grmk.grmk.services.UtilisateurService;



@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	private Logger log = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
	@Autowired
	private UtilisateurService userService ;
	@Autowired
	private RoleService roleService ;
	
	
	private static String[] ADSearchPaths = { "DC=ADS,DC=lOCAL" };

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// authentication = SecurityContextHolder.getContext().getAuthentication();

		String user = authentication.getName();
		String password = authentication.getCredentials().toString();

		// log.info("password : " + password);

		try {

			if (user.equals("Admin") && password.equals("Admin123")) {
				log.info("user Admin : " + user);
				log.info("password : " + password);
				return new UsernamePasswordAuthenticationToken(user, password, new ArrayList<>());

			} else {
				Utilisateur user1 = isLdapRegistred(user, password);
				if (user1 != null) {
					log.info("user test : " + user1.getNomPersonne());
					// use the credentials
					// and authenticate against the third-party system
					return new UsernamePasswordAuthenticationToken(user, password, new ArrayList<>());
				}

				else {log.info("External system authentication failed " );
					throw new BadCredentialsException("External system authentication failed");

				}
			}
		} catch (javax.naming.NamingException ex) {
			log.info("" + ex);
		}
		return null;
	}

	   Utilisateur isLdapRegistred(String username, String password) throws javax.naming.NamingException {
	    boolean result = false;
	    try {

	    	 Hashtable<String, String> env = new Hashtable<String, String>();
				env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
				env.put(Context.PROVIDER_URL, "ldap://10.154.253.16:389");
				env.put(Context.SECURITY_AUTHENTICATION, "simple");
				env.put(Context.SECURITY_PRINCIPAL, "adslocal\\"+username);
				env.put(Context.SECURITY_CREDENTIALS, password);
				env.put(Context.REFERRAL, "follow");

	        // Create the initial context
						  DirContext ctx = new InitialDirContext(env);
					        SearchControls controle = new SearchControls();
					        controle.setSearchScope(SearchControls.SUBTREE_SCOPE);
					        String[] attrIDs = {"sn", "givenname", "mail"};
					        String dc=username;
					        String filter = "(sAMAccountName="+dc+")";
					        
					        String searchFilter=("(&(objectClass=user)(sAMAccountName="+ (dc + "))"));
					        controle.setReturningAttributes(attrIDs);
					      result = ctx != null;
					        log.info("res "+result);
					        
					       NamingEnumeration answer = ctx.search(ADSearchPaths[0] , filter, controle);
					      
					        
					        SearchResult searchResult=null;

					        String  matricule=dc;
					        String nom=null;
					        String prenom=null;
					       // String role="DEFAULT";
					        String mail=null;
					        
				            if (answer.hasMore()) {
				            	
				            	searchResult=(SearchResult)answer.next();
				               Attributes attrs = searchResult.getAttributes();
				               nom=attrs.get("sn").get(0).toString();
				               prenom=attrs.get("givenname").get(0).toString();
				               mail=attrs.get("mail").get(0).toString();
				                log.info("sn "+nom);
				                log.info("name "+prenom);
				                log.info("mail "+mail);
				                log.info("matricule "+matricule);
				          // Role role =roleService.findById(2);
				                
				            
				                
					      

							List<Role> roles1 = roleService.findAll();
							
							
							System.out.println(roles1.size());
							if (roles1.size()==0 ) {
								
								roleService.save(new Role("ROLE_USER"));
								roleService.save(new Role("ROLE_DEFAULT"));
								roleService.save(new Role("ROLE_ADMIN"));
								roleService.updateRole("ROLE_PRODUCTION");
								roleService.updateRole("ROLE_QUALITE");
								roleService.updateRole("ROLE_PROSSES");
							} 
							  Utilisateur user=userService.findByMatricule(username);
						       
						        Role role = null;
								/*if(mail.equals("chikhahajer@gmail.com"))
								{role = roleService.findByType("ROLE_ADMIN");


								}

								else
								{
									role = roleService.findByType("ROLE_DEFAULT");

								}*/

								if( user!=null )
								{
									// logger.info("HomeController.isLdapRegistred"+us);
									result=true;

									log.info(user.getMatricule()+" "+user.getRole());
									return user;
								}
					              else 
					                   { 
					            	
					            	  
					            	  Utilisateur invite =new Utilisateur(dc,nom,prenom,mail,"SYSTEM","SYSTEM");
					                 userService.create(invite);
					                   log.info("info"+invite);
					                   return invite;
					                   }
					        	       
				            } else {
				            	log.info("user not found.");
				            	return null;
				            }
					        
					        //else {  logger.info("Echec : login is not correct", "login and password is not correct");}
					    } catch (NamingException  e) {
					    	 log.info("result "+result+e);
						        log.debug("Echec : login is not correct", "login and password is not correct"+e);
						        return null;
					    } 

	}


	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
