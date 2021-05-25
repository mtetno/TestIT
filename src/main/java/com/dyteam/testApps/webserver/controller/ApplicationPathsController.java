package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.ApplicationPaths;
import com.dyteam.testApps.webserver.entity.EmailConfigurations;
import com.dyteam.testApps.webserver.repository.ApplicationPathsRepository;
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
@RequestMapping("/applicationPaths")
public class ApplicationPathsController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ApplicationPathsRepository applicationPathsRepository;

    @PostMapping("/save")
    public ApplicationPaths save(@RequestBody ApplicationPaths applicationPaths,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save ApplicationPaths = " + applicationPaths);
        applicationPaths.setAddedBy(loggedInUser.getUserId());
        return applicationPathsRepository.save(applicationPaths);
    }

    @PostMapping("/edit")
    public ApplicationPaths edit(@RequestBody ApplicationPaths applicationPaths,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        applicationPathsRepository.deleteById(applicationPaths.getId());
        logger.info("save ApplicationPaths = " + applicationPaths);
        applicationPaths.setAddedBy(loggedInUser.getUserId());
        return applicationPathsRepository.save(applicationPaths);
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser, @PathVariable(value = "id") Long id) {
        logger.info("id" + id);
        applicationPathsRepository.deleteById(id);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllApplicationPaths() {
        logger.info("Inside getAllApplicationPaths");
        Iterable<Map<String, Object>> applicationPaths = applicationPathsRepository.fetchAll();
        return applicationPaths;
    }
}
