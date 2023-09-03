package com.grmk.grmk.services;

import com.grmk.grmk.entities.Quai;
import com.grmk.grmk.repositories.QuaiRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class QuaiServiceImpl implements QuaiService {
    @Autowired
    private QuaiRepository quaiRepository;


    @Override
    public Optional<Quai> findById(Long id) {

           return quaiRepository.findById(id);
        }

    @Override
    public List<Quai> findAll() {
       return  quaiRepository.findAll();
    }

    @Override
    public Quai save(Quai process) {
        return quaiRepository.save(process);
    }

    @Override
    public void delete(Long id) {
        quaiRepository.deleteById(id);
    }
    @Override
    public Quai  updateQuai (Long idQuai ) {
        Quai x = quaiRepository.findById(idQuai).orElse(null);
        x.setEtat("indisponible ");
        quaiRepository.save(x);
        return x ;

    }


}

