package com.dyteam.testApps.webserver.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.Testcases;
import com.dyteam.testApps.webserver.exceptions.ResourceAlreadyExists;
import com.dyteam.testApps.webserver.projection.INames;
import com.dyteam.testApps.webserver.projection.IStackBar;
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
        List<Testcases> foundcases = testcasesRepo.findByTestcaseName(testcases.getTestcaseName());
        if (foundcases.size() > 0) {
            throw new ResourceAlreadyExists("Testcase name Already exists");
        }
        testcases.setCompanyId(loggedInUser.getCompanyId());
        testcases.setAddedBy(loggedInUser.getUserId());
        Testcases save = testcasesRepo.save(testcases);
        return save;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestcases(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllTestcases");
        Iterable<Map<String, Object>> testtypes = testcasesRepo.fetchAll(loggedInUser.getCompanyId());
        return testtypes;
    }

    @GetMapping(value = "/allByComapny")
    public List<Testcases> getAllByCompanyTestcases(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllByCompanyTestcases");
        List<Testcases> testtypes = testcasesRepo.findAllByCompanyId(loggedInUser.getCompanyId());
        return testtypes;
    }

    @DeleteMapping(value = "/deleteAll")
    public boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
        testcasesRepo.deleteAll();
        return true;
    }

    @DeleteMapping(value = "/delete/{testcaseId}")
    public boolean delete(@AuthenticationPrincipal final LoginUser loggedInUser,
            @PathVariable(value = "testcaseId") Long testcaseId) {
        logger.info("testcaseId" + testcaseId);
        // testcasesRepo.updateByTestcaseId(loggedInUser.getUserId(), testcaseId);
        testcasesRepo.deleteById(testcaseId);
        return true;
    }

    @GetMapping(value = "/getAutoProgressStats")
    public List<Map<String, Object>> getAutoProgressStats() {
        logger.info("Inside getAutoProgressStats");
        List<Map<String, Object>> dashboardStats = testcasesRepo.getAutoProgressStats();
        return dashboardStats;
    }

    @GetMapping(value = "/getAutoStatusStats")
    public List<Map<String, Object>> getAutoStatusStats() {
        logger.info("Inside getAutoStatusStats");
        List<Map<String, Object>> dashboardStats = testcasesRepo.getAutoStatusStats();
        return dashboardStats;
    }

    @GetMapping(value = "/getApplicationCoverageStats")
    public List<Map<String, Object>> getApplicationCoverageStats() {
        logger.info("Inside getApplicationCoverageStats");
        List<Map<String, Object>> dashboardStats = testcasesRepo.getApplicationCoverageStats();
        return dashboardStats;
    }

    @GetMapping(value = "/getTestcasesStackedApplicationData")
    public HashMap<Long, ArrayList<IStackBar>> getTestcasesStackedApplicationData() {
        logger.info("Inside getTestcasesStackedApplicationData");
        Iterable<Testcases> allApps = testcasesRepo.groupByApplicationId();
        Iterable<Testcases> allCompany = testcasesRepo.groupByCompanyId();

        HashMap<Long, ArrayList<IStackBar>> allData = new HashMap<>();
        for (Testcases testcases : allApps) {
            Long id = testcases.getApplicationId();
            ArrayList<IStackBar> stacks = new ArrayList<>();
            for (Testcases company : allCompany) {
                logger.info(id + " : " + company.getCompanyId());
                IStackBar data = testcasesRepo.getApplicationVsCompanyStats(id, company.getCompanyId());
                stacks.add(data);
            }
            allData.put(id, stacks);
        }

        return allData;
    }

    @GetMapping(value = "/getTestcasesStackedApplicationData/companies")
    public Iterable<INames> getTestcasesStackedCompanies() {

        return testcasesRepo.getAllCompanyNamesInTestcases();

    }

    @GetMapping(value = "/getTestcasesStackedApplicationData/applications")
    public Iterable<INames> getTestcasesStackedApplications() {

        return testcasesRepo.getAllApplicationNames();

    }

}
