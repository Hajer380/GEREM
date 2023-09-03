package com.grmk.grmk.services;

import com.grmk.grmk.entities.Role;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface RoleService {
    Optional<Role> findById(Long id);
    List<Role>findAll();
    Role save(Role role);
    void delete(Long id);
    Role findByType(String type);
    Role  updateRole ( String type );

}

