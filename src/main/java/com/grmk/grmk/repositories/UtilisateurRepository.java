package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	Utilisateur findByMatricule(String NomPersonne);
}
