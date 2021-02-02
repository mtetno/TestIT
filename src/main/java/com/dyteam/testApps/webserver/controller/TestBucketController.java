package com.dyteam.testApps.webserver.controller;

import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestBucket;
import com.dyteam.testApps.webserver.repository.TestBucketRepository;
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
@RequestMapping("/testBucket")
public class TestBucketController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    TestBucketRepository testBucketRepository;
     
    @PostMapping("/save")
    public TestBucket saveTestBucket(@RequestBody TestBucket testBucketParam, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside saveTestBucket");
        TestBucket testBucket = new TestBucket();
        testBucket.setCompanyId(loggedInUser.getUserId());
        testBucket.setEnvironmentId(testBucketParam.getEnvironmentId());
        testBucket.setTestcasesId(testBucketParam.getTestcasesId());
        testBucket.setUserRoleId(testBucketParam.getUserRoleId());
        testBucket.setName(testBucketParam.getName());
        testBucket.setIsDelete(0);
        testBucket.setAddedBy(loggedInUser.getUserId());
        return testBucketRepository.save(testBucket);
    }
    
    @DeleteMapping(value = "/deleteAll")
    public boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        testBucketRepository.updateAll(loggedInUser.getUserId());
        return true;
    }

    @DeleteMapping(value = "/delete/{testBucketId}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,@PathVariable(value = "testBucketId") Long testBucketId) {
        logger.info("testBucketId"+testBucketId);
        testBucketRepository.updateByTestBucketId(loggedInUser.getUserId(),testBucketId);
        return true;
    }
    
    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestBuckets() {
        logger.info("Inside getAllTestBuckets");
        Iterable<Map<String, Object>> testtypes = testBucketRepository.fetchAll();
        return testtypes;
    }
    
}
