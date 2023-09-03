package com.grmk.grmk.services;

import com.grmk.grmk.entities.QCommentaire;
import com.grmk.grmk.repositories.QCommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class QCommentaireServiceImpl implements QCommentaireService {
    @Autowired
    private QCommentaireRepository QCommentaireRepository;

    @Override
    public Optional<QCommentaire> findById(Long id) {
        return QCommentaireRepository.findById(id);
    }

    @Override
    public List<QCommentaire> findAll() {
       return  QCommentaireRepository.findAll();
    }

    @Override
    public QCommentaire save(QCommentaire process) {
        return QCommentaireRepository.save(process);
    }

    @Override
    public void delete(Long id) {

        QCommentaireRepository.deleteById(id);
    }

}
