package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestcasesAssignmentsRequest;
import com.dyteam.testApps.webserver.repository.TestcasesAssignementsRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testcasesAssignments")
public class TestcasesAssignmentsController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    TestcasesAssignementsRepository testcasesAssignementsRepository;

    @PostMapping("/save")
    public boolean save(@RequestBody TestcasesAssignmentsRequest testcasesAssignmentsRequest, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save testcases assignments");
        for (Long compId : testcasesAssignmentsRequest.getCompanyId()) {
            testcasesAssignementsRepository.insertInto(compId, testcasesAssignmentsRequest.getTestCaseId());
        }
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestcasesAssignments(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllTestcasesAssignments");
        Iterable<Map<String, Object>> testtypes = testcasesAssignementsRepository.fetchAll();
        return testtypes;
    }

}
