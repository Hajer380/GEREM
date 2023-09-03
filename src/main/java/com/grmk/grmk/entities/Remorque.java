package com.grmk.grmk.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


/**
 * @author CHIKHA Hajer
 *
 */

@Entity
public class Remorque implements Serializable  {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdRemorque;
    private Long IdSite;
    private Long IdPersonne ;
    private String NomTransporteur ;
    private LocalDate  DateESP ;
    private LocalTime TimeESP ;
    private LocalDateTime DateSPL ;
    private LocalTime TimeRAPL ;
    private LocalDate DateEAPL;
    private String Contenu;
    private String DegUrg;
    private String Destination ;
    private String Traçabilité ;
    private String EtatR ;
    private Long IdQuai;


   /* @OneToMany
    private Set<RequestDetail> requestDetailSet;

    public Set<RequestDetail> getRequestDetailSet() {
        return requestDetailSet;
    }

    public void setRequestDetailSet(Set<RequestDetail> requestDetailSet) {
        this.requestDetailSet = requestDetailSet;
    }
*/
    public Remorque() {
    }

    public Remorque(Long idremorque, Long  idQuai,LocalTime TimeRAPL ,Long IdSite,Long IdPersonne,LocalTime TimeESP ,String NomTransporteur, LocalDate DateESP, String Contenu,  LocalDate DateEAPL, String DegUrg, String Destination ,  String Traçabilité,  String EtatR ,LocalDateTime DateSPL) {
        this.IdRemorque = idremorque;
        this.IdSite= IdSite;
        this.IdQuai = idQuai;
        this.IdPersonne = IdPersonne;
        this.NomTransporteur = NomTransporteur;
        this.DateESP = DateESP;
        this.DateEAPL = DateEAPL;
        this.TimeRAPL = TimeRAPL;
        this.TimeESP= TimeESP ;
        this.DateSPL=DateSPL;
        this.DegUrg = DegUrg;
        this.Destination = Destination;
        this.Traçabilité = Traçabilité ;
        this.EtatR = EtatR;
        this.Contenu = Contenu;

    }

    public Long getIdRemorque() {
        return IdRemorque;
    }

    public Long getIdPersonne() {
        return IdPersonne;
    }

    public Long getIdSite() { return IdSite; }

    public String getNomTransporteur() {
        return NomTransporteur;
    }

    public LocalDate getDateESP() {
        return DateESP;
    }

    public LocalTime getTimeESP() {
        return TimeESP;
    }

    public void setTimeESP(LocalTime timeESP) {
        TimeESP = timeESP;
    }

    public void setTimeRAPL(LocalTime timeRAPL) {
        TimeRAPL = timeRAPL;
    }


    public String getContenu() {
        return Contenu;
    }

    public LocalDateTime getDateSPL() {
        return DateSPL;
    }

    public LocalDate getDateEAPL() {
        return DateEAPL;
    }

    public LocalTime getTimeRAPL() {
        return TimeRAPL;
    }

    public String getDegUrg() {
        return DegUrg;
    }

    public String getDestination() {
        return Destination;
    }

    public String getEtatR() {
        return EtatR;
    }

    public String getTraçabilité() {
        return Traçabilité;
    }


    public void setIdQuai(Long idQuai) {
        IdQuai = idQuai;
    }

    public Long getIdQuai() {
        return IdQuai;
    }

    public void setIdRemorque(Long IdRemorque) {
        this.IdRemorque = IdRemorque;
    }

    public void setIdPersonne(Long IdPersonne) {
        this.IdPersonne = IdPersonne;
    }

    public void setIdSite(Long IdSite) {
        this.IdSite = IdSite;
    }

    public void setNomTransporteur(String processName) {
        this.NomTransporteur = NomTransporteur;
    }

    public void setDateESP(LocalDate DateESP) {
        this.DateESP = DateESP;
    }

    public void setContenu(String Contenu) {
        this.Contenu = Contenu;
    }

    public void setDateSPL(LocalDateTime DateSPL) {
        this.DateSPL = DateSPL;
    }

    public void setDateEAPL(LocalDate DateEAPL) {
        this.DateEAPL = DateEAPL;
    }


    public void setDegUrg(String DegUrg) { this.DegUrg = DegUrg; }

    public void setDestination(String Destination) { this.Destination = Destination; }

    public void setEtatR(String EtatR) { this.EtatR = EtatR; }

    public void setTraçabilité(String Traçabilité) { this.Traçabilité = Traçabilité; }


}
