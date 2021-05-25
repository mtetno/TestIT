package com.dyteam.testApps.webserver.controller;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dyteam.testApps.webserver.Util;
import com.dyteam.testApps.webserver.entity.Environment;
import com.dyteam.testApps.webserver.repository.ApplicationRepository;

import com.dyteam.testApps.webserver.repository.EnvironmentRepository;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

/**
 * 
 * @author deepak This controller takes care of handling all operations related
 *         to environment
 *
 */
@RestController
@RequestMapping("/environment")
public class EnvironmentController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private Environment savedEnvironment = null;

    @Autowired
    EnvironmentRepository environmentRepo;

    @Autowired
    SubscriptionsRepository subscriptionsRepository;

    @Value("${project.base.path}")
    String projectBasePath;

    @Autowired
    ApplicationRepository applicationRepo;

    @GetMapping("/{environmentId}")
    public Environment findById(@PathVariable(value = "environmentId") Long environmentId) {
        logger.info("get Environment by id=" + environmentId);
        return environmentRepo.findById(environmentId).orElse(null);
    }

    @GetMapping("/all")
    public Iterable<Environment> findAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("get all environments");
        return environmentRepo.findAll(loggedInUser.getCompanyId());
    }

    /**
     * Save environment by setting its default values Also create default folders on
     * project base path under TestData folder name
     * 
     * @param environment  - Object to save
     * @param loggedInUser - Logged in user object
     * @return
     */
    @PostMapping("/save")
    public Environment save(@RequestBody Environment environment,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save environment = " + environment);
        environment.setStatus(0);
        environment.setAddedBy(loggedInUser.getUserId());
        environment.setCompanyId(loggedInUser.getCompanyId());
        List<Environment> findByEnvironmentName = environmentRepo.findAllByEnvironmentName(loggedInUser.getUserId(),
                environment.getEnvironmentName());
        boolean isNew = findByEnvironmentName.size() > 0 ? false : true;
        if (isNew) {
            savedEnvironment = environmentRepo.save(environment);
            String companyName = subscriptionsRepository.getName(loggedInUser.getCompanyId());
            List<String> applicationNames = applicationRepo.findAllAppNamesByCompanyId(loggedInUser.getCompanyId());

            if (null != applicationNames) {
                applicationNames.parallelStream().forEach(appName -> {
                    try {
                        Util.createFolders(Paths.get(projectBasePath, Util.COMPANIES_BASE_FOLDER_NAME, companyName,
                                appName, Util.TEST_DATA_FOLDER_NAME, loggedInUser.getUsername(),
                                savedEnvironment.getEnvironmentName()));
                    } catch (IOException e) {
                        logger.error("Error occure while creating dir structure for environment=" + environment, e);
                    }
                });
            }
        } else {
            savedEnvironment = findByEnvironmentName.get(0);
            environmentRepo.updateByEnvironmentName(loggedInUser.getUserId(), environment.getEnvironmentName());
        }
        return savedEnvironment;
    }

    @DeleteMapping("/{userId}/{environmentId}")
    public Boolean delete(@PathVariable(value = "userId") Long userId,
            @PathVariable(value = "environmentId") Long environmentId) {
        environmentRepo.deleteById(environmentId);
        return true;
    }

    @GetMapping("/findAllByUserId")
    public Iterable<Environment> findAllByUserId(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("get all environments by user id");
        return environmentRepo.findAllByUserId(loggedInUser.getUserId());
    }

    public Iterable<Environment> findAll() {
        logger.info("get all environments");
        return environmentRepo.findAll();
    }
}
