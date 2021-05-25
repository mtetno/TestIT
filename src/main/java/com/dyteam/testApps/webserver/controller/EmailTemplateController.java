package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.EmailTemplates;
import com.dyteam.testApps.webserver.repository.EmailTemplateRepository;
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
@RequestMapping("/emailtemplate")
public class EmailTemplateController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    EmailTemplateRepository emailTemplateRepository;

    @PostMapping("/save")
    public EmailTemplates save(@RequestBody EmailTemplates emailTemplates,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save EmailConfigurations = " + emailTemplates);
        emailTemplates.setAddedBy(loggedInUser.getUserId());
        return emailTemplateRepository.save(emailTemplates);
    }

    @DeleteMapping(value = "/delete/{id}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser, @PathVariable(value = "id") Long id) {
        logger.info("id" + id);
        emailTemplateRepository.deleteById(id);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllEmailTemplates() {
        logger.info("Inside getAllEmailTemplates");
        Iterable<Map<String, Object>> emailTemplates = emailTemplateRepository.fetchAll();
        return emailTemplates;
    }
}
