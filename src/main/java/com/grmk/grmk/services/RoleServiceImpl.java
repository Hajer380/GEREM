package com.grmk.grmk.services;


import com.grmk.grmk.entities.Role;
import com.grmk.grmk.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public List<Role> findAll() {
       return  roleRepository.findAll();
    }

    @Override
    public Role save(Role process) {
        return roleRepository.save(process);
    }

    @Override
    public void delete(Long id) {

        roleRepository.deleteById(id);
    }


    @Override
    public Role updateRole(String roleName) {
        // TODO Auto-generated method stub
        Role role = new Role(roleName);
        role = roleRepository.save(role);

        return role;
    }

    @Override
    public Role findByType(String type){
        return roleRepository.findByType(type);
    }


}
