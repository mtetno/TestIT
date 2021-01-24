package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;
import com.dyteam.testApps.webserver.repository.ExecutionDetailsRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
     
    @PostMapping("/save")
    public ExecutionDetails saveExecutionDetails(@RequestBody ExecutionDetails executionDetailsParam, @AuthenticationPrincipal final LoginUser loggedInUser) {
        logger.info("inside saveExecutionDetails");
        ExecutionDetails executionDetails = new ExecutionDetails();
        executionDetails.setCompanyId(loggedInUser.getCompanyId());
        executionDetails.setExecutionName(executionDetailsParam.getExecutionName());
        executionDetails.setEnvironmentId(executionDetailsParam.getEnvironmentId());
        executionDetails.setTestingEnvironmentId(executionDetailsParam.getTestingEnvironmentId());
        executionDetails.setUserRoleId(executionDetailsParam.getUserRoleId());
        executionDetails.setThreads(executionDetailsParam.getThreads());
        executionDetails.setScheduleDate(executionDetailsParam.getScheduleDate());
        executionDetails.setScheduleTime(executionDetailsParam.getScheduleTime());
        executionDetails.setTestcasesId(executionDetailsParam.getTestcasesId());
        executionDetails.setTriggeredBy(loggedInUser.getUserId());
        executionDetails.setIsDelete(0);
       return executionDetailsRepository.save(executionDetails);
    }
    
}
