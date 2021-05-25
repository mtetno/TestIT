package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.Subscriptions;
import com.dyteam.testApps.webserver.entity.User;
import com.dyteam.testApps.webserver.repository.AccessRoleRepository;
import com.dyteam.testApps.webserver.repository.ApplicationPathsRepository;
import com.dyteam.testApps.webserver.repository.ApplicationRepository;
import com.dyteam.testApps.webserver.repository.EmailConfigurationsRepository;
import com.dyteam.testApps.webserver.repository.EmailTemplateRepository;
import com.dyteam.testApps.webserver.repository.EnvironmentRepository;
import com.dyteam.testApps.webserver.repository.ExecutionDetailsRepository;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
import com.dyteam.testApps.webserver.repository.TestBucketRepository;
import com.dyteam.testApps.webserver.repository.TestMethodRespository;
import com.dyteam.testApps.webserver.repository.TestcasesRepository;
import com.dyteam.testApps.webserver.repository.UserRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    SubscriptionsRepository subscriptionsRepository;

    @Autowired
    AccessRoleRepository accessRoleRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    ApplicationPathsRepository applicationPathsRepository;

    @Autowired
    EmailConfigurationsRepository emailConfigurationsRepository;

    @Autowired
    EmailTemplateRepository emailTemplateRepository;

    @Autowired
    EnvironmentRepository environmentRepository;

    @Autowired
    ExecutionDetailsRepository executionDetailsRepository;

    @Autowired
    TestBucketRepository testBucketRepository;

    @Autowired
    TestMethodRespository testMethodRespository;

    @Autowired
    TestcasesRepository testcasesRepository;

    @PostMapping("/save")
    public Subscriptions save(@RequestBody Subscriptions subscriptions,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save Subscriptions = " + subscriptions);
        subscriptions.setAddedBy(loggedInUser.getUserId());

        Subscriptions savedSubscriptions = subscriptionsRepository.save(subscriptions);

        // Create user
        User createUser = new User();
        createUser.setUserType(1);
        createUser.setCompanyId(savedSubscriptions.getId());
        createUser.setfName(savedSubscriptions.getUsername());
        createUser.setlName("");
        createUser.setEmail(savedSubscriptions.getEmail());
        createUser.setPassword(passwordEncoder.encode(savedSubscriptions.getPassword()));
        createUser.setUserName(savedSubscriptions.getUsername());
        createUser.setContact("");
        createUser.setAddress("");
        createUser.setRefUserId(savedSubscriptions.getAddedBy());
        createUser.setAddedBy(savedSubscriptions.getAddedBy());
        createUser.setStatus(0);

        userRepository.save(createUser);
        return savedSubscriptions;
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody Subscriptions subscriptions,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("update Subscriptions = " + subscriptions);
        subscriptionsRepository.update(subscriptions.getCompanyName(), subscriptions.getUsername(),
                subscriptions.getPassword(), subscriptions.getEmail(), subscriptions.getTestingEnvironmentId(),
                subscriptions.getRemindBefore(), subscriptions.getThreads(), subscriptions.getEndDate(),
                subscriptions.getStartDate(), subscriptions.getId());
        return true;
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser, @PathVariable(value = "id") Long id) {
        logger.info("id" + id);
        subscriptionsRepository.deleteById(id);
        accessRoleRepository.deleteByCompanyId(id);
        applicationRepository.deleteByCompanyId(id);
        userRepository.deleteByCompanyId(id);
        applicationPathsRepository.deleteByCompanyId(id);
        emailConfigurationsRepository.deleteByCompanyId(id);
        emailTemplateRepository.deleteByCompanyId(id);
        environmentRepository.deleteByCompanyId(id);
        executionDetailsRepository.deleteByCompanyId(id);
        testBucketRepository.deleteByCompanyId(id);
        testMethodRespository.deleteByCompanyId(id);
        testcasesRepository.deleteByCompanyId(id);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllSubscriptions() {
        logger.info("Inside getAllSubscriptions");
        Iterable<Map<String, Object>> sunscriptions = subscriptionsRepository.fetchAll();
        return sunscriptions;
    }
}