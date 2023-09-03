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
public class MouvementRemorque implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdMvtR;
    private String CodeMvtR;
    private Long IdRemorque;

    public MouvementRemorque(Long IdMvtR, String CodeMvtR, Long IdRemorque) {
        super();
        this.IdMvtR = IdMvtR;
        this.CodeMvtR = CodeMvtR;
        this.IdRemorque = IdRemorque;
    }

    public Long getIdMvtR() {
        return IdMvtR;
    }
    public void setIdMvtR(Long idRobot) {
        this.IdMvtR = IdMvtR;
    }
    public String getCodeMvtR() {
        return CodeMvtR;
    }
    public void setCodeMvtR(String CodeMvtQ) { this.CodeMvtR = CodeMvtR; }
    public Long getIdRemorque() {
        return IdRemorque;
    }
    public void setIdRemorque(Long description) {
        this.IdRemorque = IdRemorque;
    }
}
