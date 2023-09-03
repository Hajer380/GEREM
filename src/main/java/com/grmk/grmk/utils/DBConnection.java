package com.grmk.grmk.utils;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

//import javafx.scene.control.Alert;
//import javafx.scene.control.Alert.AlertType;

public class DBConnection {
	 public Connection conn = null;
	    public Statement stmt;

	    private static Map<String, DBConnection> mapInstances = new HashMap<String, DBConnection>(25);

	    private String dbURL;
	    private String dbUser;
	    private String dbPassword;
	    private String dbDriver;

	    private DBConnection(String dbURL, String dbUser, String dbPassword, String dbDriver) {
	        this.dbPassword = dbPassword;
	        this.dbURL = dbURL;
	        this.dbUser = dbUser;
	        this.dbDriver = dbDriver;
	    }

	    public synchronized static DBConnection newInstance(String name, String dbURL, String dbUser, String dbPassword,String dbDriver) {
	        DBConnection con = new DBConnection(dbURL, dbUser, dbPassword,dbDriver);
	        mapInstances.put(name, con);
	        return con;
	    }

	    public synchronized static DBConnection getInstance(String name) {
	        return mapInstances.get(name);
	    }

	    public synchronized Connection getCon() {
	        if (conn == null) {
	        	try {
	  	    	  
	            try {
	                try {
						Class.forName(dbDriver).newInstance();
					} catch (InstantiationException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	                conn = DriverManager.getConnection(dbURL, dbUser, dbPassword);
	                //Alert alert = new Alert(AlertType.INFORMATION);
	 				//alert.setTitle("Bienvenue ");
	 				String msg = "Connexion done successfully";
	 				System.out.println(msg);
	 				//alert.setContentText(msg);
	 				//alert.showAndWait();
	           // JOptionPane.showMessageDialog(null,"Connexion done successfully", "Driver trouvable! ", JOptionPane.INFORMATION_MESSAGE);
			    	  
	            } catch (ClassNotFoundException e) {
	            	//Alert alert = new Alert(AlertType.ERROR);
	 				//alert.setTitle("Erreur ");
	 				String msg = "Driver introuvable";
	 				System.out.println(msg);
	 				//alert.setContentText(msg);
	 				//alert.showAndWait();
					// TODO Auto-generated catch block
					
					e.printStackTrace();
				        
	            }
		      } catch (Exception e) {
		    	  //Alert alert = new Alert(AlertType.ERROR);
	 				//alert.setTitle("Erreur ");
	 				String msg = "Connexion echoué";
	 				System.out.println(msg);
	 				//alert.setContentText(msg);
	 				//alert.showAndWait();
		      }        
		        
		      
		    }	
	        
		    return conn;	
		  
	    }
	    public ResultSet getResultat(String query) {
	    	
	    	ResultSet rs=null;
	        try {
				System.out.println(query);
	        	stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			
	         rs = stmt.executeQuery(query);
	         System.out.println("ok");
	        } catch (SQLException e) {
				// TODO Auto-generated catch block
	        	System.out.println(e.getMessage());
	        	//JOptionPane.showMessageDialog(null, e.getMessage(), "ERREUR DE CONNEXION ! ", JOptionPane.ERROR_MESSAGE);
	  	      
			}
	        return rs;
	    }


}
