package com.grmk.grmk.services;


    import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
    import java.text.SimpleDateFormat;


    import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
    import org.springframework.stereotype.Service;


@Service
public class MAILING {
    private static final Logger logger = LoggerFactory.getLogger(MAILING.class);
    private static DecimalFormat twoDForm = new DecimalFormat("#.##");
    private static DecimalFormatSymbols dfs = new DecimalFormatSymbols();
    private static SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");
    private static SimpleDateFormat sdf1 = new SimpleDateFormat("dd-M-yyyy");



}


