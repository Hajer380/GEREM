package com.grmk.grmk.repositories;

import com.grmk.grmk.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author CHIKHA Hajer
 *
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long > {
    Role findByType(String type);
}
