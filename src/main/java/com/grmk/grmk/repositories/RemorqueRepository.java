package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.Remorque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface RemorqueRepository extends JpaRepository<Remorque, Long> {

}