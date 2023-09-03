package com.grmk.grmk.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.lang.ProcessBuilder.Redirect;

/**
 * @author CHIKHA Hajer
 * 
 */
@RestController
@CrossOrigin

@RequestMapping("/Rest/Api/ExecuterCMD")
public class ExecuterCMD {

	public void exe(String com) {
		try {
			String[] commande = { "cmd.exe", "/c", com };
			System.out.println("Exécution de la commande:" + com + "\n");
			ProcessBuilder pb = new ProcessBuilder(commande);
			pb.redirectError(Redirect.INHERIT);
			pb.redirectOutput(Redirect.INHERIT);
			Process p = pb.start();
			System.out.println("En attente:\n");
			p.waitFor();
			System.out.println("Commande exécutée\n");
		} catch (IOException e) {
			System.out.println("La commande a échoué\n");
			e.printStackTrace();
		} catch (InterruptedException e) {
			System.out.println("Echec wait for\n");
			e.printStackTrace();
		}
	}

	// TODO ASK ABOUT THE EXE
	 /* @PostMapping(value = "/ExecuterCMD")
	  public void ExecuterCMD(@RequestBody Requete req) {
	     exe(req.getReq()); 
	 }
	 
	@GetMapping(value = "/ExecuterCMD", produces = MediaType.APPLICATION_JSON_VALUE)
        @GetMapping(value = "/ExecuterCMD")
	public void ExecuterCMD() {
		String com="//s-fs002/Shares/Bian/exe/Robot/RunRobot.bat"+matriculeRobot;
		String com = "notepad.exe";
		exe(com);
	}*/
}
