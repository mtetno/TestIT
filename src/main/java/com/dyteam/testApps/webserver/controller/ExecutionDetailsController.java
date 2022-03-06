package com.dyteam.testApps.webserver.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;
import com.dyteam.testApps.webserver.entity.ExecutionDetailsRequest;
import com.dyteam.testApps.webserver.entity.ExecutionQueues;

import com.dyteam.testApps.webserver.repository.ExecutionDetailsRepository;
import com.dyteam.testApps.webserver.repository.ExecutionQueuesRepository;

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
@RequestMapping("/executionDetails")
public class ExecutionDetailsController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    ExecutionDetailsRepository executionDetailsRepository;

    @Autowired
    ExecutionQueuesRepository executionQueuesRepository;
     
    @PostMapping("/save")
    public boolean saveExecutionDetails(@RequestBody ExecutionDetailsRequest executionDetailsRequest, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("inside saveExecutionDetails");
        ExecutionQueues executionQueue = new ExecutionQueues();
        executionQueue.setExecutionName(executionDetailsRequest.getExecutionName());
        executionQueue.setUserRoleId(0);
        executionQueue.setExecutionStatus("QUEUED");
        ExecutionQueues savedExecutionQueues = executionQueuesRepository.save(executionQueue);

        for(int i=0;i<executionDetailsRequest.getRunTestCases().size();i++){
            ExecutionDetails executionDetails = new ExecutionDetails();
            executionDetails.setApplicationName(executionDetailsRequest.getRunTestCases().get(i).getApplicationName());
            executionDetails.setTestcasesId(executionDetailsRequest.getRunTestCases().get(i).getTestCase());
            executionDetails.setExecutionName(executionDetailsRequest.getExecutionName());

            executionDetails.setCompanyId(loggedInUser.getCompanyId());
            executionDetails.setExecutionId(savedExecutionQueues.getId());
            // setApplicatioName
            executionDetails.setEnvironmentId(executionDetailsRequest.getEnvironmentId());
            executionDetails.setTestingEnvironmentId(executionDetailsRequest.getTestingEnvironmentId());
            executionDetails.setUserRoleId(executionDetailsRequest.getUserRoleId());
            executionDetails.setThreads(executionDetailsRequest.getThreads());
            String date = executionDetailsRequest.getScheduleDate().trim() == null || executionDetailsRequest.getScheduleDate().trim().equals("")  ? null : executionDetailsRequest.getScheduleDate().trim() ;
            executionDetails.setScheduleDate(date);
            String time = executionDetailsRequest.getScheduleTime().trim() == null || executionDetailsRequest.getScheduleTime().trim().equals("")  ? null : executionDetailsRequest.getScheduleTime().trim() ;
            executionDetails.setScheduleTime(time);
            executionDetails.setTestResult("QUEUED");
            // executionDetails.setTestcasesId(executionDetailsParam.getTestcasesId());
            executionDetails.setTriggeredBy(loggedInUser.getUserId());
            executionDetails.setIsDelete(0);
            executionDetailsRepository.save(executionDetails);
        }
       return true;
    }

    @GetMapping(value = "/allByCompany")
    public Iterable<Map<String, Object>> getAllExecutionsByCompanyId(  @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllExecutionsByCompanyId");
        Iterable<Map<String, Object>> data = executionDetailsRepository.findAllByCompanyId(loggedInUser.getCompanyId());
        return data;
    }

    @GetMapping(value = "/futureExecutions/allByCompany")
    public Iterable<Map<String, Object>> getAllFutureExecutionsByCompanyId(  @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllFutureExecutionsByCompanyId");
        Iterable<Map<String, Object>> data = executionDetailsRepository.findAllFutureExecutionByCompanyId(loggedInUser.getCompanyId());
        return data;
    }


    @GetMapping(value = "/recentExecutions/allByCompany")
    public Iterable<Map<String, Object>> getRecentExecutions(  @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("Inside getAllFutureExecutionsByCompanyId");
        Iterable<Map<String, Object>> data = executionDetailsRepository.getRecentExecutions(loggedInUser.getCompanyId());
        return data;
    }

    @DeleteMapping(value = "/deleteByExecutionId/{executionId}")
    public boolean deleteByExecutionId(  @PathVariable(value = "executionId") Long executionId) {
        logger.info("Inside deleteByExecutionId");
        executionDetailsRepository.deleteFromExecutionDetailsExecutionId(executionId);
        executionDetailsRepository.deleteFromExecutionQueueExecutionId(executionId);
        return true;
    }

    @GetMapping(value = "/markForceFailed/{executionId}")
    public boolean markForceFailed(  @PathVariable(value = "executionId") Long executionId) {
        logger.info("Inside markForceFailed");
        executionDetailsRepository.markForceFailed(executionId);
        return true;
    }

    @GetMapping(value = "/markExecutionRetry/{executionId}")
    public boolean markExecutionRetry(  @PathVariable(value = "executionId") Long executionId) {
        logger.info("Inside markExecutionRetry");
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        String str = sdf.format(new Date());
        executionDetailsRepository.markExecutionRetry(executionId,str);
        return true;
    }
    
    
}
