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
public class Role implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdRole;
    private String Type;


    public Role(long IdRole , String type ) {
        this.IdRole= IdRole;
        this.Type=type;

    }
    public Role(){}


    
    public Role ( String type) {
    	super();
	this.Type=type;
}



    public Long getIdRole() {
        return IdRole;
    }

    public void setIdRole(Long idRole) {
        IdRole = idRole;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getType() {
        return Type;
    }

   

}



