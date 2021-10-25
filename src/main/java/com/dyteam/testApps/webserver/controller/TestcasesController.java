package com.dyteam.testApps.webserver.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.dyteam.testApps.webserver.entity.Testcases;
import com.dyteam.testApps.webserver.entity.TestcasesRequest;
import com.dyteam.testApps.webserver.entity.TestcasesStep;
import com.dyteam.testApps.webserver.entity.UploadTestcasesRequest;
import com.dyteam.testApps.webserver.exceptions.ResourceAlreadyExists;
import com.dyteam.testApps.webserver.projection.INames;
import com.dyteam.testApps.webserver.projection.IStackBar;
import com.dyteam.testApps.webserver.repository.TestcasesAssignementsRepository;
import com.dyteam.testApps.webserver.repository.TestcasesRepository;
import com.dyteam.testApps.webserver.repository.TestcasesStepRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

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

    @Autowired
    TestcasesStepRepository testcasesStepRepository;

    @Autowired
    TestcasesAssignementsRepository testcasesAssignementsRepository;

    @PostMapping("/save")
    public Testcases save(@RequestBody TestcasesRequest testcasesRequest, @AuthenticationPrincipal final LoginUser loggedInUser) {
        Testcases testcases = new Testcases();
        testcases.setApplicationId(testcasesRequest.getApplicationId());
        testcases.setAutoProgressId(testcasesRequest.getAutoProgressId());
        testcases.setAutoStatusId(testcasesRequest.getAutoStatusId());
        testcases.setClassName(testcasesRequest.getClassName());
        testcases.setComment(testcasesRequest.getComment());
        testcases.setObjective(testcasesRequest.getObjective());
        testcases.setIsDelete(0);
        testcases.setCreatedAt(testcasesRequest.getCreatedAt());
        testcases.setTestMethod(testcasesRequest.getTestMethod());
        testcases.setTestTypeId(testcasesRequest.getTestTypeId());
        testcases.setComment(testcasesRequest.getComment());

        logger.info("save testcases = " + testcases);
        List<Testcases> foundcases = testcasesRepo.findByTestMethod(testcases.getTestMethod());
        if (foundcases.size() > 0) {
            throw new ResourceAlreadyExists("Testcase name Already exists");
        }
        testcases.setCompanyId(loggedInUser.getCompanyId());
        testcases.setAddedBy(loggedInUser.getUserId());
        Testcases save = testcasesRepo.save(testcases);
        testcasesAssignementsRepository.insertInto(loggedInUser.getCompanyId(), save.getTestcasesId());
        for(int i=0;i<testcasesRequest.getTestCaseSteps().size();i++){
        TestcasesStep step = new TestcasesStep();
        step.setTestcase_id(save.getTestcasesId());
        step.setStep(testcasesRequest.getTestCaseSteps().get(i).getStep());
        step.setExpected(testcasesRequest.getTestCaseSteps().get(i).getExpected());
        testcasesStepRepository.save(step);
        }

        return save;
    }

    @PostMapping("/edit")
    public Testcases edit(@RequestBody TestcasesRequest testcasesRequest, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("edit testcases = " + testcasesRequest);
        Optional<Testcases> foundcases = testcasesRepo.findById(testcasesRequest.getTestcasesId());
        if(foundcases.isPresent()){
            Testcases save = foundcases.get();
            save.setApplicationId(testcasesRequest.getApplicationId());
            save.setAutoProgressId(testcasesRequest.getAutoProgressId());
            save.setAutoStatusId(testcasesRequest.getAutoStatusId());
            save.setClassName(testcasesRequest.getClassName());
            save.setComment(testcasesRequest.getComment());
            save.setObjective(testcasesRequest.getObjective());
            save.setIsDelete(0);
            save.setTestMethod(testcasesRequest.getTestMethod());
            save.setTestTypeId(testcasesRequest.getTestTypeId());
            save.setComment(testcasesRequest.getComment());
            save.setAddedBy(loggedInUser.getUserId());

            testcasesStepRepository.deleteByTestcaseId(testcasesRequest.getTestcasesId());
            for(int i=0;i<testcasesRequest.getTestCaseSteps().size();i++){
            TestcasesStep step = new TestcasesStep();
            step.setTestcase_id(save.getTestcasesId());
            step.setStep(testcasesRequest.getTestCaseSteps().get(i).getStep());
            step.setExpected(testcasesRequest.getTestCaseSteps().get(i).getExpected());
            testcasesStepRepository.save(step);
            }
            return testcasesRepo.save(save);
        }

        return null;
    }

    @GetMapping(value = "/all")
    public Iterable<Map<String, Object>> getAllTestcases(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllTestcases");
        Iterable<Map<String, Object>> testtypes = testcasesRepo.fetchAllByCid(loggedInUser.getCompanyId());
        return testtypes;
    }

    @GetMapping(value = "/superuser/all")
    public Iterable<Map<String, Object>> getAllSuperTestcases(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllSuperTestcases");
        Iterable<Map<String, Object>> testtypes = testcasesRepo.fetchAll();
        return testtypes;
    }

    @GetMapping(value = "/allByComapny")
    public List<Map<String, Object>> getAllByCompanyTestcases(@AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllByCompanyTestcases");
        List<Map<String, Object>> testtypes = testcasesRepo.findAllByCompanyId(loggedInUser.getCompanyId());
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
        testcasesAssignementsRepository.deleteAssignmentsWithTestCaseId(testcaseId);
        testcasesStepRepository.deleteByTestcaseId(testcaseId);
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

    @GetMapping(value = "/downloadTestcases/{companyId}/{applicationId}")
    public List<Map<String, Object>> downloadTestcases(@PathVariable(value = "companyId") Long companyId,@PathVariable(value = "applicationId") Long applicationId) {
        return testcasesRepo.downloadTestcases(companyId,applicationId);
    }

    @GetMapping(value = "/getTestcaseSteps/{testcaseId}")
    public List<Map<String, Object>> getTestcaseSteps(@PathVariable(value = "testcaseId") Long testcaseId) {
        return testcasesStepRepository.fetchAllStepsByTestId(testcaseId);
    }

    @PostMapping("/uploadTestcases/{companyId}/{applicationId}")
    public boolean uploadTestcases(@PathVariable(value = "companyId") Long companyId,@PathVariable(value = "applicationId") Long applicationId,
        @RequestBody UploadTestcasesRequest uploadTestcasesRequest, @AuthenticationPrincipal final LoginUser loggedInUser) {

        logger.info("Inside uploadTestcases");
        for (ArrayList<String> item : uploadTestcasesRequest.getData() ) {
                Long testcase_id = Long.parseLong(item.get(0).trim().equals("") ? "0" : item.get(0).trim());
                // String testcase_name = item.get(1) != null ? item.get(1) : "" ;
                // String description = item.get(2) != null ? item.get(2) : "";
                String test_method = item.get(1) != null ? item.get(1) : "";
                String company_name= item.get(2)!= null ? item.get(2) : "";
                String application_name = item.get(3)!= null ? item.get(3) : "";
                String class_name = item.get(4)!= null ? item.get(4) : "";
                    logger.info(testcase_id + " , " + test_method   + " , " + company_name  + " , " + application_name + " , " + class_name);
                if(testcase_id > 0){
                    logger.info("Inside updateBulkTestcases--------------------");
                    testcasesRepo.updateBulkTestcases(testcase_id,  test_method, class_name,companyId,applicationId);
                }else{
                    logger.info("Inside insertBulkTestcases-----------------------");
                    testcasesRepo.insertBulkTestcases( test_method, class_name, companyId, applicationId);
                }
    }
    return true;

}

}
