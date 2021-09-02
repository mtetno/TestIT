package com.dyteam.testApps.webserver.entity;


public class ExecutionDetailsTestCases{
		

    private Long applicationId;
    private String applicationName;
    private String testCase;
    private String testCaseName;



    public Long getApplicationId() {
        return this.applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicationName() {
        return this.applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getTestCase() {
        return this.testCase;
    }

    public void setTestCase(String testCase) {
        this.testCase = testCase;
    }

    public String getTestCaseName() {
        return this.testCaseName;
    }

    public void setTestCaseName(String testCaseName) {
        this.testCaseName = testCaseName;
    }



    public ExecutionDetailsTestCases() {
    }
    

    public ExecutionDetailsTestCases(Long applicationId, String applicationName, String testCase, String testCaseName) {
        this.applicationId = applicationId;
        this.applicationName = applicationName;
        this.testCase = testCase;
        this.testCaseName = testCaseName;
    }



}
