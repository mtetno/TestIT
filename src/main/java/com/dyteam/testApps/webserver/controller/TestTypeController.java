package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.TestType;
import com.dyteam.testApps.webserver.repository.TestTypeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testtype")
public class TestTypeController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    TestTypeRepository testTypeRepository;
     
    @GetMapping(value = "/all")
    public Iterable<TestType> getTestType()  {
        logger.info("Inside getTestType");
    	Iterable<TestType> testtypes = testTypeRepository.findAll();
    	return testtypes;
    }
    
}
