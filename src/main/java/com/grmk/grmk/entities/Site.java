package com.grmk.grmk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;


/**
 * @author CHIKHA Hajer
 *
 */

@Entity
public class Site implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long IdSite;
	private String Local;
	private String NomSite ;
	private Long IdQuai ;
	
	public Site(String nomSite) {
		super();

	}
	public Site(Long IdSite, String nomSite , String local,Long IdQuai ) {
		super();
		this.IdSite = IdSite;
		this.NomSite = nomSite;
		this.Local=local ;
		this.IdQuai=IdQuai;
	}
	public Long getIdSite() {
		return IdSite;
	}
	public void setIdSite(Long idSite) {
		this.IdSite = idSite;
	}

	public void setLocal(String local) {
		Local = local;
	}

	public String getLocal() {
		return Local;
	}

	public void setNomSite(String nomSite) {
		NomSite = nomSite;
	}

	public String getNomSite() {
		return NomSite;
	}

	public Long getIdQuai() {
		return IdQuai;
	}

	public void setIdQuai(Long idQuai) {
		IdQuai = idQuai;
	}
	 /*@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "profileSet")
	private Set<User> userSet;

	public Set<User> getUserSet() {
		return userSet;
	}

	public void setUserSet(Set<User> userSet) {
		this.userSet = userSet;
	}*/
}
