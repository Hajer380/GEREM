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
public class QCommentaire implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

 	private Long IdCmtQ;
	private String Type ;
	private Long IdMvtQ ;

	public QCommentaire (Long idCmtQ , Long idMvtQ , String type ){super ();
	this.IdCmtQ=idCmtQ;
	this.IdMvtQ=idMvtQ;
	this.Type=type;

	}

	public Long getIdCmtQ() {
		return IdCmtQ;
	}

	public String getType() {
		return Type;
	}

	public void setType(String type) {
		Type = type;
	}

	public Long getIdMvtQ() {
		return IdMvtQ;
	}

	public void setIdCmtQ(Long idCmtQ) {
		IdCmtQ = idCmtQ;
	}

	public void setIdMvtQ(Long idMvtQ) {
		IdMvtQ = idMvtQ;
	}
}
