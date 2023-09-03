package com.grmk.grmk.services;

import com.grmk.grmk.entities.RCommentaire;
import com.grmk.grmk.repositories.RCommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class RCommentaireServiceImpl implements RCommentaireService {
    @Autowired
    private RCommentaireRepository RCommentaireRepository;

    @Override
    public Optional<RCommentaire> findById(Long id) {
        return RCommentaireRepository.findById(id);
    }

    @Override
    public List<RCommentaire> findAll() {
       return  RCommentaireRepository.findAll();
    }

    @Override
    public RCommentaire save(RCommentaire process) {
        return RCommentaireRepository.save(process);
    }

    @Override
    public void delete(Long id) {

        RCommentaireRepository.deleteById(id);
    }

}
