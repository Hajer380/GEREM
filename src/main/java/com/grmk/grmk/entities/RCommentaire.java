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
public class RCommentaire implements Serializable {

    private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long IdCmtR;
        private String Type ;
        private Long IdRemorque ;


        public RCommentaire (Long idCmtR , Long IdRemorque , String type ){super ();
            this.IdCmtR=idCmtR;
            this.IdRemorque=IdRemorque;
            this.Type=type;

        }

        public Long getIdCmtR() {
            return IdCmtR;
        }

        public String getType() {
            return Type;
        }

        public void setType(String type) {
            Type = type;
        }

        public Long getIdRemorque() {
            return IdRemorque;
        }

        public void setIdCmtR(Long idCmtQ) {
            IdCmtR = idCmtQ;
        }

        public void setIdRemorque(Long IdRemorque) {
            IdRemorque = IdRemorque;
        }
    }

