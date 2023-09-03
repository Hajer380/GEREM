package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.MouvementQuai;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface MouvementQuaiRepository extends JpaRepository<MouvementQuai, Long> {

}
