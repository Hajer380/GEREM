package com.grmk.grmk.services;

import com.grmk.grmk.entities.MouvementRemorque;
import com.grmk.grmk.repositories.MouvementRemorqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class MouvementRemorqueServiceImpl implements MouvementRemorqueService {
    @Autowired
    private MouvementRemorqueRepository MouvementRemorqueRepository;


    @Override
    public Optional<MouvementRemorque> findById(Long id) {
        return MouvementRemorqueRepository.findById(id);
    }

    @Override
    public List<MouvementRemorque> findAll() {
        return MouvementRemorqueRepository.findAll();
    }

    @Override
    public MouvementRemorque save(MouvementRemorque robot) {
        return MouvementRemorqueRepository.save(robot);
    }

    @Override
    public void delete(Long id) {

        MouvementRemorqueRepository.deleteById(id);
    }



}
