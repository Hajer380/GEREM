package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.QCommentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface QCommentaireRepository extends JpaRepository<QCommentaire, Long> {

}