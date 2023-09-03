package com.grmk.grmk.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import java.io.Serializable;


/**
 * @author CHIKHA Hajer
 *
 */


@Entity
public class Utilisateur extends Audit<String> implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long idPersonne;
	private String nomPersonne;
	private String prenomPersonne;
	private String adresseMail;
	private String matricule;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private Role role;
	public Utilisateur() {
		super();
	}
	public Utilisateur(Long idPersonne,String matricule ,String nomPersonne, String adresseMail,String prenomPersonne) {
		super();
		this.idPersonne= idPersonne;
		this.nomPersonne= nomPersonne;
		this.adresseMail=adresseMail;
		this.matricule=matricule;
		this.prenomPersonne=prenomPersonne;

	}

	public Utilisateur(String matricule ,String nomPersonne, String adresseMail,String prenomPersonne,String createdBy, String lastModifiedBy ) {
		super(createdBy, lastModifiedBy);

		this.nomPersonne= nomPersonne;
		this.adresseMail=adresseMail;
		this.matricule=matricule;
		this.prenomPersonne=prenomPersonne;

	}

	public Long getIdPersonne() {
		return idPersonne;
	}

	public void setIdPersonne(Long idPersonne) {
		this.idPersonne = idPersonne;
	}

	public String getAdresseMail() {
		return adresseMail;
	}

	public String getNomPersonne() {
		return nomPersonne;
	}

	public void setAdresseMail(String adresseMail) {
		this.adresseMail = adresseMail;
	}

	public void setNomPersonne(String nomPersonne) {
		this.nomPersonne = nomPersonne;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

	public String getPrenomPersonne() {
		return prenomPersonne;
	}

	public void setPrenomPersonne(String prenomPersonne) {
		this.prenomPersonne = prenomPersonne;

	}


	public void setMatricule (String A){
		this.matricule=A ;
	}

	public String getMatricule() {
		return matricule;
	}
}




