package com.dyteam.testApps.webserver.entity;

import java.util.ArrayList;

public class TestcasesAssignmentsRequest {


	private String testMethod;

	private Long testCaseId;

	private ArrayList<Long> companyId;

	private Long applicationId;

	private Long automationStatusId;

	

	public String getTestMethod() {
		return testMethod;
	}

	public void setTestMethod(String testMethod) {
		this.testMethod = testMethod;
	}

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public Long getAutomationStatusId() {
		return automationStatusId;
	}

	public void setAutomationStatusId(Long automationStatusId) {
		this.automationStatusId = automationStatusId;
	}

	public Long getTestCaseId() {
		return this.testCaseId;
	}

	public void setTestCaseId(Long testCaseId) {
		this.testCaseId = testCaseId;
	}

	public ArrayList<Long> getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(ArrayList<Long> companyId) {
		this.companyId = companyId;
	}


}