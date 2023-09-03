package com.grmk.grmk.services;

import com.grmk.grmk.entities.MouvementQuai;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface MouvementQuaiService {
    Optional<MouvementQuai> findById(Long id);
    List<MouvementQuai>findAll();
    MouvementQuai save(MouvementQuai robot);
    void delete(Long id);
    void updateMouvementQuai( Long idmvt , String code);
}
