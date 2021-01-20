package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.AutomationStatus;
import com.dyteam.testApps.webserver.repository.AutomationStatusRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/automationStatus")
public class AutomationStatusController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    AutomationStatusRepository automationStatusRepository;
     
    @GetMapping(value = "/all")
    public Iterable<AutomationStatus> getAutomationStatus()  {
        logger.info("Inside getAutomationStatus");
    	Iterable<AutomationStatus> automationStatus = automationStatusRepository.findAll();
    	return automationStatus;
    }
    
}
