package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.TestingEnvironment;
import com.dyteam.testApps.webserver.repository.TestingEnvironmentRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testingEnvironment")
public class TestingEnvironmentController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    TestingEnvironmentRepository testingEnvironmentRepository;
     
    @GetMapping(value = "/all")
    public Iterable<TestingEnvironment> getTestingEnvironment()  {
        logger.info("Inside getTestingEnvironment");
    	Iterable<TestingEnvironment> testcaseResults = testingEnvironmentRepository.findAll();
    	return testcaseResults;
    }
    
}
