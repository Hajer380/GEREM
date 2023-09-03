package com.grmk.grmk.controllers;

import com.grmk.grmk.entities.Utilisateur;
import com.grmk.grmk.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author CHIKHA Hajer
 *
 */

@RestController
@RequestMapping("/Rest/Api/UTILISATEUR")
public class UserController {
    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping(value = "/addUser", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Utilisateur addUser(@RequestBody Utilisateur Utilisateur) {
        return utilisateurService.save(Utilisateur );
    }
    @GetMapping(value = "/getUsers")
    public List<Utilisateur> getUtilisateur() {
        return  utilisateurService.findAll();
    }
}
