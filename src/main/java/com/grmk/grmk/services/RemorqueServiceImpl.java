package com.grmk.grmk.services;

import com.grmk.grmk.entities.Remorque;
import com.grmk.grmk.repositories.RemorqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

/**
 * @author CHIKHA Hajer
 *
 */
@Service

public class RemorqueServiceImpl implements RemorqueService {
    @Autowired
    private RemorqueRepository RemorqueRepository;


    /*@Autowired
    private QuaiService processRobotService;
    @Autowired
    private MouvementRemorqueService mouvementRemorqueService;


    @Override
    public void createrequest(quai foundprocess, user founduser) {
        date dateview = new date();
        datetimeformatter dtf = datetimeformatter.ofpattern("yyyy/mm/dd hh:mm:ss");
        localdatetime now = localdatetime.now();

        qcommentaire newrequest= new qcommentaire(foundprocess.getidprocess(), foundprocess.getprocessrobotlib(),  founduser.getiduser() ,  remorqueservice.executor_type_user,  dateview,now,foundprocess.getpriority(),"non traitée");
        set<requestdetail>requestdetails= new hashset<>();
        for (mouvementquai r: foundprocess.getrobotset()) {
            requestdetail newrequestdetail = new requestdetail(r.getidrobot(),r.getnamerobot(),r.getstatus(), foundprocess.getpriority());
            mouvementremorqueservice.save(newrequestdetail);
            requestdetails.add(newrequestdetail);
        }
        newrequest.setrequestdetailset(requestdetails);
        this.save(newrequest);
    }

    @Override
    public Set<QCommentaire> findByUserId(Long id) {
        return requestRepository.findByUserId(id);
    }
*/


    @Override
    public Optional<Remorque> findById(Long id) {
        return RemorqueRepository.findById(id);
    }

    @Override
    public List<Remorque> findAll() {
        return RemorqueRepository.findAll();
    }

    @Override
    public Remorque save(Remorque rm) {
        return RemorqueRepository.save(rm);
    }

    @Override
    public void delete(Long id) {

        RemorqueRepository.deleteById(id);
    }

    @Override
    public void updateTempPort(Long id, LocalTime t) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setTimeESP(t);
        RemorqueRepository.save(rm);
    }

    @Override
    public void updateTempArrivèPL(Long id, LocalTime t) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setTimeRAPL(t);
        RemorqueRepository.save(rm);

    }

    @Override
    public void updateDateTempSortiePL(Long id, LocalDateTime dt) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setDateSPL(dt);
        RemorqueRepository.save(rm);
    }

    @Override
    public void updateDatePort(Long id, LocalDate d) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setDateESP(d);
        RemorqueRepository.save(rm);
    }

    @Override
    public Remorque updateRemorque(Remorque remorque , Long id) {
        Remorque rm = this.findById(id).orElse(null);
        rm = remorque ;
        RemorqueRepository.save(rm);
        return rm ;
    }

    @Override
    public void updateDateArrivèPL(Long id, LocalDate d) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setDateEAPL(d);
        RemorqueRepository.save(rm);
    }


    @Override
    public void updateUrgence(Long id, String deg) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setDegUrg(deg);
        RemorqueRepository.save(rm);

    }

    @Override
    public void updateRemorqueET(Long id, String EtatR) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setEtatR(EtatR);
        RemorqueRepository.save(rm);
    }

    @Override
    public void updateRemorqueDest(Long id, String Destination) {
        Remorque rm = this.findById(id).orElse(null);
        rm.setDestination(Destination);
        RemorqueRepository.save(rm);
    }





}