package com.dyteam.testApps.webserver.entity;


import java.util.Date;
import java.util.List;

public class TestcasesRequest {
	
	private Long testcasesId;

	private Long companyId;
	
	private String objective;

	private String className;

	private String testMethod;

	private Long applicationId;

	private Long testTypeId;

	private Long autoStatusId;

	private Long autoProgressId;

	private String comment;
	
	private Long addedBy;

	private Integer isDelete;
	
	private Date createdAt;

	private List<TestcasesStep> testCaseSteps ;

	public TestcasesRequest() {
	}

	public Long getTestcasesId() {
		return this.testcasesId;
	}

	public void setTestcasesId(Long testcasesId) {
		this.testcasesId = testcasesId;
	}

	public Long getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getObjective() {
		return this.objective;
	}

	public void setObjective(String objective) {
		this.objective = objective;
	}

	public String getClassName() {
		return this.className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getTestMethod() {
		return this.testMethod;
	}

	public void setTestMethod(String testMethod) {
		this.testMethod = testMethod;
	}

	public Long getApplicationId() {
		return this.applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public Long getTestTypeId() {
		return this.testTypeId;
	}

	public void setTestTypeId(Long testTypeId) {
		this.testTypeId = testTypeId;
	}

	public Long getAutoStatusId() {
		return this.autoStatusId;
	}

	public void setAutoStatusId(Long autoStatusId) {
		this.autoStatusId = autoStatusId;
	}

	public Long getAutoProgressId() {
		return this.autoProgressId;
	}

	public void setAutoProgressId(Long autoProgressId) {
		this.autoProgressId = autoProgressId;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Long getAddedBy() {
		return this.addedBy;
	}

	public void setAddedBy(Long addedBy) {
		this.addedBy = addedBy;
	}

	public Integer getIsDelete() {
		return this.isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Date getCreatedAt() {
		return this.createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<TestcasesStep> getTestCaseSteps() {
		return this.testCaseSteps;
	}

	public void setTestCaseSteps(List<TestcasesStep> testCaseSteps) {
		this.testCaseSteps = testCaseSteps;
	}
	
}
