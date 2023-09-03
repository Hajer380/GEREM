package com.grmk.grmk.controllers;


import com.grmk.grmk.entities.Quai;
import com.grmk.grmk.services.QuaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author CHIKHA Hajer
 *
 */

@RestController
@RequestMapping("/Rest/Api/QUAI")
public class QuaiController {
    @Autowired
    private QuaiService quaiService;


    @GetMapping(value = "/getQauiById/{idQuai}")
    public Quai getQuaiById(@PathVariable("idQuai") Long idQuai ) {
        return  null;
    }
    @GetMapping(value = "/getQuaiList")
    public List<Quai> getQuaiList() {
        return  quaiService.findAll();
    }
    @PostMapping(value = "/addQuai", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Quai addQuai(@RequestBody Quai Quai) {
        return  quaiService.save(Quai);
    }
    @PutMapping(value = "/updateQuai/{idQuai}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Quai updateQuai(@RequestBody Quai Quai, @PathVariable("idQuai") Long idQuai ){
       return quaiService.updateQuai(idQuai);
    }
    @DeleteMapping(value = "/deleteQuai/{idQuai}")
    public void deleteQuai(@PathVariable("idQuai") Long idQuai ) {
        quaiService.delete(idQuai);
    }
}
