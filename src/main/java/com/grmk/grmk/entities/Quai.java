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
public class Quai implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long IdQuai;
	private String NomQuai;

	private String Etat;
	/*@jointable(name = "processrobot_robot", joincolumns = {
			@joincolumn(name = "process", referencedcolumnname = "idprocess")}, inversejoincolumns = {
			@joincolumn(name = "robot", referencedcolumnname = "idrobot")})
	@manytomany(fetch = fetchtype.eager, cascade = cascadetype.all)


	private set<mouvementquai>robotset;
*/
	public Quai() {
		super();
	}
	public Quai( String NomQuai, Long IdQuai , String Etat ) {
		super();

		this.NomQuai = NomQuai;
		this.IdQuai = IdQuai;
		this.Etat =Etat;
	}


	public Long getIdQuai() {
		return IdQuai;
	}
	public void setIdQuai(Long IdQuai) {
		this.IdQuai = IdQuai;
	}
	public String getNomQuai() { return NomQuai; }
	public void setNomQuai(String NomQuai) {
		this.NomQuai = NomQuai;
	}


	public String getEtat() {
		return Etat;
	}

	public void setEtat(String Etat) {
		this.Etat = Etat;
	}
}
