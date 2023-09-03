package com.grmk.grmk.services;

import com.grmk.grmk.entities.RCommentaire;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface RCommentaireService {
    Optional<RCommentaire> findById(Long id);
    List<RCommentaire>findAll();
    RCommentaire save(RCommentaire rôle);
    void delete(Long id);

}

