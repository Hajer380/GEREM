package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.MouvementRemorque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface MouvementRemorqueRepository extends JpaRepository<MouvementRemorque, Long> {

}
