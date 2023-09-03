package com.grmk.grmk.services;

import com.grmk.grmk.entities.MouvementQuai;
import com.grmk.grmk.repositories.MouvementQuaiRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service

public class MouvementQuaiServiceImpl implements MouvementQuaiService {

    @Autowired
    private MouvementQuaiRepository MouvementQuaiRepository;


    @Override
    public Optional<MouvementQuai> findById(Long id) {
        return MouvementQuaiRepository.findById(id);
    }

    @Override
    public List<MouvementQuai> findAll() {
        return MouvementQuaiRepository.findAll();
    }

    @Override
    public MouvementQuai save(MouvementQuai robot) {
        return MouvementQuaiRepository.save(robot);
    }

    @Override
    public void delete(Long id) {

        MouvementQuaiRepository.deleteById(id);
    }

    @Override
    public void updateMouvementQuai(Long id, String code) {

            MouvementQuai x = MouvementQuaiRepository.findById(id).orElse(null);
            x.setCodeMvtQ(code);
            MouvementQuaiRepository.save(x);


    }


}
