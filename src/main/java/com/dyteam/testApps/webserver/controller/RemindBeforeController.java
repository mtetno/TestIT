package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.RemindBefore;
import com.dyteam.testApps.webserver.repository.RemindBeforeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/remindBefore")
public class RemindBeforeController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    RemindBeforeRepository remindBeforeRepository;
     
    @GetMapping(value = "/all")
    public Iterable<RemindBefore> getAllReminders() {
        logger.info("Inside getAllReminders");
        Iterable<RemindBefore> reminders = remindBeforeRepository.findAll();
        return reminders;
    }
}
