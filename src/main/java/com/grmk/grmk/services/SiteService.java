package com.grmk.grmk.services;

import com.grmk.grmk.entities.Site;

import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA_Hajer
 *
 */
public interface SiteService {

    public static final String EXECUTOR_TYPE_USER="user";
    public static final String EXECUTOR_TYPE_APP="app";
    public static final String EXECUTOR_TYPE_JOB="job";
    Optional<Site> findById(Long id);
    List<Site> findAll();
    Site save(Site site);
    void delete(Long id);
    Site updateSite(Long idSite, String local , String NomSite);
}
