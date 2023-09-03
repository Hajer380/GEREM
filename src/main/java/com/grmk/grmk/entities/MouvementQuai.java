package com.grmk.grmk.entities;

import javax.persistence.*;
import java.io.Serializable;


/**
 * @author CHIKHA Hajer
 *
 */
@Entity
@Table(name = "mouvement_quai")
public class MouvementQuai implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long IdMvtQ;
	private String CodeMvtQ;
	private Long IdQuai;

	//@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "robotSet")
	//@JsonBackReference
	//private Set<com.uib.robotApp.entities.Quai> processRobotSet;

	public MouvementQuai() {
		super();
	}
	public MouvementQuai(Long IdMvtQ, String CodeMvtQ, Long IdQuai) {
		super();
		this.IdMvtQ = IdMvtQ;
		this.CodeMvtQ = CodeMvtQ;
		this.IdQuai = IdQuai;
	}

	public Long getIdMvtQ() {
		return IdMvtQ;
	}
	public void setIdMvtQ(Long idRobot) {
		this.IdMvtQ = IdMvtQ;
	}
	public String getCodeMvtQ() {
		return CodeMvtQ;
	}
	public void setCodeMvtQ(String CodeMvtQ) { this.CodeMvtQ = CodeMvtQ; }
	public Long getIdQuai() {
		return IdQuai;
	}
	public void setIdQuai(Long description) {
		this.IdQuai = IdQuai;
	}


}
