package com.grmk.grmk.services;


import com.grmk.grmk.entities.Site;

import com.grmk.grmk.repositories.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */

@Service

public class SiteServiceImpl implements SiteService {
    @Autowired
    private SiteRepository SiteRepository;

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
    public Optional<Site> findById(Long id) {
        return SiteRepository.findById(id);
    }

    @Override
    public List<Site> findAll() {
        return SiteRepository.findAll();
    }

    @Override
    public Site save(Site site) {
        return SiteRepository.save(site);
    }

    @Override
    public void delete(Long idsite) {

        SiteRepository.deleteById(idsite);
    }

    @Override
    public Site updateSite(Long idSite, String local , String NomSite) {
        Site x = SiteRepository.findById(idSite).orElse(null);
        x.setLocal(local);
        x.setNomSite(NomSite);
        SiteRepository.save(x);
        return x ;
    }



}
