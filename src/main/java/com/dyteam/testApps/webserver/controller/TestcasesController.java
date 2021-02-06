package com.dyteam.testApps.webserver.controller;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.Testcases;
import com.dyteam.testApps.webserver.repository.TestcasesRepository;
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
@RequestMapping("/testcases")
public class TestcasesController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    TestcasesRepository testcasesRepo;

    @PostMapping("/save")
    public Testcases save(@RequestBody Testcases testcases, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("save testcases = " + testcases);
        Testcases testcasesDB = new Testcases();
        testcasesDB.setTestcaseName(testcases.getTestcaseName());
        testcasesDB.setCompanyId(loggedInUser.getCompanyId());
        testcasesDB.setDescription(testcases.getDescription());
        testcasesDB.setClassName(testcases.getClassName());
        testcasesDB.setTestMethod(testcases.getTestMethod());
        testcasesDB.setEnvironmentId(testcases.getEnvironmentId());
        testcasesDB.setApplicationId(testcases.getApplicationId());
        testcasesDB.setTestTypeId(testcases.getTestTypeId());
        testcasesDB.setFoundInBuild(testcases.getFoundInBuild());
        testcasesDB.setAutoStatusId(testcases.getAutoStatusId());
        testcasesDB.setAutoProgressId(testcases.getAutoProgressId());
        testcasesDB.setAddedBy(loggedInUser.getUserId());
        testcasesDB.setIsDelete(testcases.getIsDelete());
     
        Testcases save = testcasesRepo.save(testcasesDB);
        return save;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestcases() {
        logger.info("Inside getAllTestcases");
        Iterable<Map<String, Object>> testtypes = testcasesRepo.fetchAll();
        return testtypes;
    }

    @GetMapping(value = "/allByComapny")
    public  List<Testcases> getAllByCompanyTestcases(
            @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllByCompanyTestcases");
        List<Testcases> testtypes = testcasesRepo.findAllByCompanyId(loggedInUser.getCompanyId());
    	return testtypes;
    }

    @DeleteMapping(value = "/deleteAll")
    public boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        testcasesRepo.updateAll(loggedInUser.getUserId());
        return true;
    }

    @DeleteMapping(value = "/delete/{testcaseId}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,@PathVariable(value = "testcaseId") Long testcaseId) {
        logger.info("testcaseId"+testcaseId);
        testcasesRepo.updateByTestcaseId(loggedInUser.getUserId(),testcaseId);
        return true;
    }

    @GetMapping(value = "/getAutoProgressStats")
    public  List<Map<String, Object>> getAutoProgressStats() {
        logger.info("Inside getAutoProgressStats");
        List<Map<String, Object>> dashboardStats= testcasesRepo.getAutoProgressStats();
    	return dashboardStats;
    }

    @GetMapping(value = "/getAutoStatusStats")
    public  List<Map<String, Object>> getAutoStatusStats() {
        logger.info("Inside getAutoStatusStats");
        List<Map<String, Object>> dashboardStats= testcasesRepo.getAutoStatusStats();
    	return dashboardStats;
    }

    @GetMapping(value = "/getApplicationCoverageStats")
    public  List<Map<String, Object>> getApplicationCoverageStats() {
        logger.info("Inside getApplicationCoverageStats");
        List<Map<String, Object>> dashboardStats= testcasesRepo.getApplicationCoverageStats();
    	return dashboardStats;
    }
}
