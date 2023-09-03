package com.grmk.grmk.controllers;

import com.grmk.grmk.entities.Role;
import com.grmk.grmk.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author CHIKHA Hajer
 *
 */

@RestController
@RequestMapping("/Rest/Api/Role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping(value = "/addRole", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Role addRole(@RequestBody Role Role) {
        return roleService.save(Role );
    }

    @GetMapping(value = "/getRole")
    public List<Role> getRole() {
        return  roleService.findAll();
    }


    @PutMapping(value = "/updateRole/{idRole}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Role updateRole(@RequestBody Role Role, @PathVariable("idRole") Long idRole ){
        return roleService.updateRole( Role.getType());
    }
    @DeleteMapping(value = "/deleteRole/{idRole}")
    public void deleteRole(@PathVariable("idRole") Long idRole ) {
        roleService.delete(idRole);
    }



}
