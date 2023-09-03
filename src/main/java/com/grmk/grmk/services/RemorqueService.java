package com.grmk.grmk.services;


import com.grmk.grmk.entities.Remorque;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * @author CHIKHA Hajer
 *
 */
public interface RemorqueService {

    public static final String EXECUTOR_TYPE_USER="user";
    public static final String EXECUTOR_TYPE_APP="app";
    public static final String EXECUTOR_TYPE_JOB="job";


    Optional<Remorque> findById(Long id);
    List<Remorque> findAll();
    Remorque save(Remorque REM);
    void delete(Long id);
    void updateTempPort(Long id, LocalTime t );
    void updateTempArrivèPL(Long id, LocalTime t );
    void updateDateTempSortiePL(Long id, LocalDateTime dt );
    void updateDatePort(Long id, LocalDate d);
    void updateDateArrivèPL(Long id, LocalDate d );
    void updateUrgence( Long id,String deg );
    void updateRemorqueET(Long id, String EtatR);
    void updateRemorqueDest(Long id,String Destination);
    Remorque updateRemorque(Remorque remorque , Long idRemorque);
}
