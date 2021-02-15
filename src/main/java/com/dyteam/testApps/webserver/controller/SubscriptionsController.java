package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.Subscriptions;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionsController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    SubscriptionsRepository subscriptionsRepository;
     
    @PostMapping("/save")
    public Subscriptions save(@RequestBody Subscriptions subscriptions, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save Subscriptions = " + subscriptions);
        subscriptions.setAddedBy(loggedInUser.getUserId());
        Long comp = Long.parseLong("77"); // nned to ask & change
        subscriptions.setCompanyId(comp); 
       return subscriptionsRepository.save(subscriptions);
    }

    @DeleteMapping(value = "/deleteAll")
    public boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        subscriptionsRepository.updateAll(loggedInUser.getUserId());
        return true;
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,@PathVariable(value = "id") Long id) {
        logger.info("id"+id);
        subscriptionsRepository.updateBySubscriptionId(loggedInUser.getUserId(),id);
        return true;
    }
    
    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllSubscriptions() {
        logger.info("Inside getAllSubscriptions");
        Iterable<Map<String, Object>> sunscriptions = subscriptionsRepository.fetchAll();
        return sunscriptions;
    }
}