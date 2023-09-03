package com.grmk.grmk.services;

import com.grmk.grmk.entities.QCommentaire;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */

public interface QCommentaireService {
    Optional<QCommentaire> findById(Long id);
    List<QCommentaire>findAll();
    QCommentaire save(QCommentaire rôle);
    void delete(Long id);

}

