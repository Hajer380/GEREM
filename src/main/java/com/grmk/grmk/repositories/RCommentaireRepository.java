package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.RCommentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface RCommentaireRepository extends JpaRepository<RCommentaire, Long> {

}