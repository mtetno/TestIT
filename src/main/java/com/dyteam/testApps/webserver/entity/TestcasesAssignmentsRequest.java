package com.dyteam.testApps.webserver.entity;

import java.util.ArrayList;

public class TestcasesAssignmentsRequest {

	private Long testCaseId;

	private ArrayList<Long> companyId;


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