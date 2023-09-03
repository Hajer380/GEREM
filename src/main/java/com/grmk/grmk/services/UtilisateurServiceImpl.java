package com.grmk.grmk.services;

import com.grmk.grmk.entities.Utilisateur;
import com.grmk.grmk.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class UtilisateurServiceImpl implements UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Optional<Utilisateur> findById(Long id) {
        return utilisateurRepository.findById(id);
    }

    @Override
    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

  /*  @Override
    public boolean update(Utilisateur user) {
        return UtilisateurRepository.update(Utilisateur);
    }*/

    @Override
    public Utilisateur save(Utilisateur user) {
        return utilisateurRepository.save(user);
    }

    @Override
    public void delete(Long id){
         utilisateurRepository.deleteById(id);
    }

    @Override
    public boolean isUserExist(Utilisateur user) {

        return findById(user.getIdPersonne())!= null;
    }

	@Override
	public Utilisateur findByMatricule(String maTRICULE) {
		// TODO Auto-generated method stub
		return utilisateurRepository.findByMatricule(maTRICULE);
	}
	@Override
    public Utilisateur create(Utilisateur user){
        return utilisateurRepository.save(user);
    }



}
