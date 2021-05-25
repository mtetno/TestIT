package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestMethods;
import com.dyteam.testApps.webserver.repository.TestMethodRespository;
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
@RequestMapping("/testMethod")
public class TestMethodsConstroller {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    TestMethodRespository testMethodRespository;

    @PostMapping("/save")
    public TestMethods save(@RequestBody TestMethods inputTestMethod,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save testcases = " + inputTestMethod);
        inputTestMethod.setAddedBy(loggedInUser.getUserId());
        return testMethodRespository.save(inputTestMethod);
    }

    @DeleteMapping(value = "/delete/{testMethodId}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,
            @PathVariable(value = "testMethodId") Long testMethodId) {
        logger.info("testMethodId" + testMethodId);
        testMethodRespository.deleteById(testMethodId);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestMethods() {
        logger.info("Inside getAllTestcases");
        Iterable<Map<String, Object>> testtypes = testMethodRespository.fetchAll();
        return testtypes;
    }
}
