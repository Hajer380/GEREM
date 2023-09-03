package com.grmk.grmk.services;

import com.grmk.grmk.entities.Quai;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */

public interface QuaiService {
    Optional<Quai> findById(Long id);
    List<Quai>findAll();
    Quai save(Quai QUAI);
    void delete(Long id);
    Quai updateQuai( Long idQuai);
}

