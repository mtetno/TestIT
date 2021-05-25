package com.dyteam.testApps.webserver.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestBucket;
import com.dyteam.testApps.webserver.entity.TestBucketTestcases;
import com.dyteam.testApps.webserver.repository.TestBucketRepository;
import com.dyteam.testApps.webserver.repository.TestBucketTestcasesRepository;
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

    @Autowired
    TestBucketTestcasesRepository testBucketTestcasesRepository;

    @PostMapping("/save")
    public TestBucket saveTestBucket(@RequestBody TestBucket testBucketParam,
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside saveTestBucket");
        ;
        ArrayList<Long> bucketTestCaseId = testBucketParam.getTestcasesId();
        logger.info("Inside bucketTestCaseId size" + bucketTestCaseId.size());
        TestBucket testBucket = new TestBucket();
        testBucket.setCompanyId(loggedInUser.getUserId());
        testBucket.setEnvironmentId(testBucketParam.getEnvironmentId());
        testBucket.setUserRoleId(testBucketParam.getUserRoleId());
        testBucket.setName(testBucketParam.getName());
        testBucket.setIsDelete(0);
        testBucket.setAddedBy(loggedInUser.getUserId());
        TestBucket savedBucket = testBucketRepository.save(testBucket);
        for (Long testcaseid : bucketTestCaseId) {
            TestBucketTestcases testBucketTestcases = new TestBucketTestcases();
            testBucketTestcases.setBucketId(savedBucket.getId());
            testBucketTestcases.setTestcaseId(testcaseid);
            testBucketTestcasesRepository.save(testBucketTestcases);
        }
        return savedBucket;
    }

    @DeleteMapping(value = "/delete/{testBucketId}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,
            @PathVariable(value = "testBucketId") Long testBucketId) {
        logger.info("testBucketId" + testBucketId);
        testBucketRepository.deleteById(testBucketId);
        return true;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestBuckets() {
        logger.info("Inside getAllTestBuckets");
        Iterable<Map<String, Object>> testtypes = testBucketRepository.fetchAll();
        return testtypes;
    }

    @GetMapping(value = "/fetchTestBucketDetails/{id}")
    public Iterable<Map<String, Object>> fetchTestBucketDetails(@PathVariable(value = "id") Long id) {
        logger.info("Inside fetchTestBucketDetails");
        Iterable<Map<String, Object>> testtypes = testBucketRepository.fetchBucketDetails(id);
        return testtypes;
    }

    @GetMapping(value = "/cloneTestBucket/{id}/{bucketName}/{environment}/{userRole}")
    public int cloneTestBucket(@PathVariable(value = "id") Long id,
            @PathVariable(value = "bucketName") String bucketName,
            @PathVariable(value = "environment") Long environment, @PathVariable(value = "userRole") Long userRole) {
        logger.info("Inside cloneTestBucket");
        testBucketRepository.cloneBucket(id);
        int cloneId = testBucketRepository.getInsertedBucketId();
        testBucketRepository.updateBucket(cloneId, bucketName, environment, userRole);
        // testBucketRepository.cloneBucketTestcases(Long.valueOf(cloneId));
        List<TestBucketTestcases> allexisting = testBucketTestcasesRepository.findAllByBucketId(id);
        for (TestBucketTestcases testBucketTestcases : allexisting) {
            TestBucketTestcases tcases = new TestBucketTestcases();
            tcases.setBucketId(new Long(String.valueOf(cloneId)));
            tcases.setTestcaseId(testBucketTestcases.getTestcaseId());
            testBucketTestcasesRepository.save(tcases);
        }
        return cloneId;
    }

}
