package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.Subscriptions;
import com.dyteam.testApps.webserver.entity.User;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
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

    @DeleteMapping(value = "/deleteAll")
    public boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        subscriptionsRepository.updateAll(loggedInUser.getUserId());
        return true;
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser, @PathVariable(value = "id") Long id) {
        logger.info("id" + id);
        subscriptionsRepository.updateBySubscriptionId(loggedInUser.getUserId(), id);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllSubscriptions() {
        logger.info("Inside getAllSubscriptions");
        Iterable<Map<String, Object>> sunscriptions = subscriptionsRepository.fetchAll();
        return sunscriptions;
    }
}