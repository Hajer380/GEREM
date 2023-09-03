package com.grmk.grmk.controllers;


import com.grmk.grmk.entities.Site;
import com.grmk.grmk.services.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author CHIKHA Hajer
 *
 */

@RestController
@RequestMapping("/Rest/Api/Site")
public class SiteController {

    @Autowired
    private SiteService SiteService;

    @PostMapping(value = "/addSite", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Site addSite(@RequestBody Site Site) {
        return SiteService.save(Site );
    }

    @GetMapping(value = "/getSite")
    public List<Site> getSite() {
        return  SiteService.findAll();
    }


    @PutMapping(value = "/updateSite/{idSite}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public Site updateSite(@RequestBody Site Site, @PathVariable("idSite") Long idSite ){
        return SiteService.updateSite(idSite ,Site.getLocal() ,Site.getNomSite() );
    }
    @DeleteMapping(value = "/deleteSite/{idSite}")
    public void deleteSite(@PathVariable("idSite") Long idSite ) {
        SiteService.delete(idSite);
    }



    /*@PostMapping(value = "/createRequest")

    public ResponseEntity<String> createRequest(@RequestBody RequestDTO requestIn, HttpServletRequest request, HttpServletResponse response) {
        Quai foundProcess = processRobotService.findById(requestIn.getIdProcess()).orElse(null);
        if (foundProcess != null) {
        User foundUser = userService.findById(requestIn.getIdExecutor()).orElse(null);
                    if (foundUser != null) {
                        remorqueService.createRequest(foundProcess,foundUser);
                        return new ResponseEntity<>("La demande a été prise en charge", HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("Cet utilisateur ne figure pas dans la BDD ", HttpStatus.NOT_FOUND);
                    }
        } else {
            return new ResponseEntity<>("Le process n'existe pas dans la base de données", HttpStatus.NOT_FOUND);
        }
    }




    @GetMapping(value = "/getRequestList")
    public ResponseEntity<Object> getRequests() {
            return !remorqueService.findAll().isEmpty()
                ? new ResponseEntity<Object>(remorqueService.findAll(), HttpStatus.OK)
                :  new ResponseEntity<>("Il n'existe aucune demande dans la BDD", HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/getRequestById/{idRequest}")
    public ResponseEntity getRequestById(@PathVariable("idRequest") Long idRequest)  {
        return remorqueService.findById(idRequest).isPresent()
                ? new ResponseEntity(remorqueService.findById(idRequest), HttpStatus.OK)
                :  new ResponseEntity("La demande n'existe pas dans la BDD", HttpStatus.NOT_FOUND);
    }
    @GetMapping(value = "/getRequestByUserId/{idUser}")
    public ResponseEntity getRequestByUserId(@PathVariable("idUser") Long idUser)  {
        return remorqueService.findByUserId(idUser).isEmpty()
                ? new ResponseEntity(remorqueService.findByUserId(idUser), HttpStatus.OK)
                :  new ResponseEntity("L'utilisateur n'a aucune demande", HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/updateRequest/{idRequest}", consumes = { MediaType.APPLICATION_JSON_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE})
    public QCommentaire updateRequest(@RequestBody QCommentaire request, @PathVariable("idRequest") Long idRequest ){
        return remorqueService.updateRequest(request,idRequest);
    }

    @DeleteMapping(value = "/deleteRequestById/{idRequest}")
    public ResponseEntity<String> deleteRequestById(@PathVariable("idRequest") Long idRequest)  {
        QCommentaire found= remorqueService.findById(idRequest).orElse(null);
        if (found!=null) {
            remorqueService.delete(idRequest);
            return new ResponseEntity<>("La demande a été supprimée", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("La demande n'existe pas dans la base de données", HttpStatus.NOT_FOUND);
        }
    }*/
}
