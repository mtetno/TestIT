package com.dyteam.testApps.webserver.model;

import java.io.Serializable;
import java.util.List;

import com.dyteam.testApps.webserver.entity.CompanyEnvironUrl;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RunTestCases implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long applicationId;
	private String applicationName;
	private Long testCase;
	private String testCaseName;


	public RunTestCases(Long applicationId, String applicationName, Long testCase, String testCaseName) {
		this.applicationId = applicationId;
		this.applicationName = applicationName;
		this.testCase = testCase;
		this.testCaseName = testCaseName;
	}


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

	public Long getTestCase() {
		return this.testCase;
	}

	public void setTestCase(Long testCase) {
		this.testCase = testCase;
	}

	public String getTestCaseName() {
		return this.testCaseName;
	}

	public void setTestCaseName(String testCaseName) {
		this.testCaseName = testCaseName;
	}


	
}
