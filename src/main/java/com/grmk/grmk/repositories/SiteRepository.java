package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {

}
