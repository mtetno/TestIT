package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.EmailConfigurations;
import com.dyteam.testApps.webserver.repository.EmailConfigurationsRepository;
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
@RequestMapping("/emailConfigurations")
public class EmailConfigurationController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    EmailConfigurationsRepository emailConfigurationsRepository;

    @PostMapping("/save")
    public EmailConfigurations save(@RequestBody EmailConfigurations emailConfigurations,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save EmailConfigurations = " + emailConfigurations);
        emailConfigurations.setAddedBy(loggedInUser.getUserId());
        return emailConfigurationsRepository.save(emailConfigurations);
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser, @PathVariable(value = "id") Long id) {
        logger.info("id" + id);
        emailConfigurationsRepository.deleteById(id);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllEmailConfigurations() {
        logger.info("Inside getAllEmailConfigurations");
        Iterable<Map<String, Object>> emailConfigurations = emailConfigurationsRepository.fetchAll();
        return emailConfigurations;
    }
}
