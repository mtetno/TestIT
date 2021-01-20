package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.AutomationProgress;
import com.dyteam.testApps.webserver.repository.AutomationProgressRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/automationProgress")
public class AutomationProgressController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    AutomationProgressRepository automationProgressRepository;
     
    @GetMapping(value = "/all")
    public Iterable<AutomationProgress> getAutomationProgress()  {
        logger.info("Inside getAutomationProgress");
    	Iterable<AutomationProgress> automationProgress = automationProgressRepository.findAll();
    	return automationProgress;
    }
    
}
