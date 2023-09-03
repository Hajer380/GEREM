package com.grmk.grmk.services;

import com.grmk.grmk.entities.MouvementRemorque;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface MouvementRemorqueService {
    Optional<MouvementRemorque> findById(Long id);
    List<MouvementRemorque> findAll();
    MouvementRemorque save(MouvementRemorque mouvementRemorque);
    void delete(Long id);

}
