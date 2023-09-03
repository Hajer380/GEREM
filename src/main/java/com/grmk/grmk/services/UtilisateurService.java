package com.grmk.grmk.services;

import com.grmk.grmk.entities.Utilisateur;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface UtilisateurService {
    Optional<Utilisateur> findById(Long id);
    List<Utilisateur>findAll();
    Utilisateur create(Utilisateur user);
    Utilisateur save(Utilisateur UTILISATEUR);
    void delete(Long id);
    boolean isUserExist(Utilisateur user);
    Utilisateur findByMatricule(String NomPersonne);
}
