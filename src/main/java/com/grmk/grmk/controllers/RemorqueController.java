package com.grmk.grmk.controllers;

import com.grmk.grmk.entities.Remorque;
import com.grmk.grmk.services.RemorqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author CHIKHA Hajer
 *
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/Rest/Api/Remorque")
public class RemorqueController {
    @Autowired
    private RemorqueService RemorqueService;

    @GetMapping(value = "/getRemorqueList")
    public ResponseEntity<List<Remorque>> getRemorqueList() {
        return !RemorqueService.findAll().isEmpty()
                ? new ResponseEntity<>(RemorqueService.findAll(), HttpStatus.OK)
                :  new ResponseEntity("Il n'existe aucun process dans la BDD", HttpStatus.NO_CONTENT);
    }
    @GetMapping(value = "/getRemorqueById/{idRemorque}")
    public ResponseEntity<java.util.Optional<Remorque>> getRemorqueById(@PathVariable("idRemorque") Long idRemorque ) {
       return RemorqueService.findById(idRemorque).isPresent()
                ? new ResponseEntity<>(RemorqueService.findById(idRemorque), HttpStatus.OK)
                : new ResponseEntity("Le process n'existe pas dans la BDD", HttpStatus.NOT_FOUND);
    }
    @PostMapping(value = "/addRemorque" , consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Remorque> addRemorque(@RequestBody Remorque Remorque) {
        return new ResponseEntity<>(RemorqueService.save(Remorque), HttpStatus.OK);
    }
    @PutMapping(value = "/updateRemorque/{idRemorque}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Remorque updateProcess(@RequestBody Remorque Remorque, @PathVariable("idRemorque") Long idRemorque ){
        return RemorqueService.updateRemorque(Remorque,idRemorque);
    }
    @DeleteMapping(value = "/deleteRemorque/{idRemorque}")
    public void deleteRemorque(@PathVariable("idRemorque") Long idRemorque) {
        RemorqueService.delete(idRemorque);
    }

}
