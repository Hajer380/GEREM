package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.Quai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface QuaiRepository extends JpaRepository<Quai, Long> {

}