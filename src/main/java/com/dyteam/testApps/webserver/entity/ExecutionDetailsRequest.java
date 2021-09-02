package com.dyteam.testApps.webserver.entity;

import java.util.ArrayList;


public class ExecutionDetailsRequest {
	private String name;
	private String executionName;
	private Long environmentId;
	private Long testingEnvironmentId;
	private Long userRoleId;
	private Long threads;
	private String scheduleDate;
	private String scheduleTime;
	private ArrayList<ExecutionDetailsTestCases> runTestCases;


	public ExecutionDetailsRequest() {
	}


	public ExecutionDetailsRequest(String name, String executionName, Long environmentId, Long testingEnvironmentId, Long userRoleId, Long threads, String scheduleDate, String scheduleTime, ArrayList<ExecutionDetailsTestCases> runTestCases) {
		this.name = name;
		this.executionName = executionName;
		this.environmentId = environmentId;
		this.testingEnvironmentId = testingEnvironmentId;
		this.userRoleId = userRoleId;
		this.threads = threads;
		this.scheduleDate = scheduleDate;
		this.scheduleTime = scheduleTime;
		this.runTestCases = runTestCases;
	}

	

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExecutionName() {
		return this.executionName;
	}

	public void setExecutionName(String executionName) {
		this.executionName = executionName;
	}

	public Long getEnvironmentId() {
		return this.environmentId;
	}

	public void setEnvironmentId(Long environmentId) {
		this.environmentId = environmentId;
	}

	public Long getTestingEnvironmentId() {
		return this.testingEnvironmentId;
	}

	public void setTestingEnvironmentId(Long testingEnvironmentId) {
		this.testingEnvironmentId = testingEnvironmentId;
	}

	public Long getUserRoleId() {
		return this.userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public Long getThreads() {
		return this.threads;
	}

	public void setThreads(Long threads) {
		this.threads = threads;
	}

	public String getScheduleDate() {
		return this.scheduleDate;
	}

	public void setScheduleDate(String scheduleDate) {
		this.scheduleDate = scheduleDate;
	}

	public String getScheduleTime() {
		return this.scheduleTime;
	}

	public void setScheduleTime(String scheduleTime) {
		this.scheduleTime = scheduleTime;
	}

	public ArrayList<ExecutionDetailsTestCases> getRunTestCases() {
		return this.runTestCases;
	}

	public void setRunTestCases(ArrayList<ExecutionDetailsTestCases> runTestCases) {
		this.runTestCases = runTestCases;
	}

}


