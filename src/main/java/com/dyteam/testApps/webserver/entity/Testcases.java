package com.dyteam.testApps.webserver.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "testcases")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class Testcases {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="testcase_id")
	private Long testcasesId;

	@Column(name="company_id")
	@NotNull
	private Long companyId;
	
	@Column(name="testcase_name")
	@NotNull
	private String testcaseName;

	@Column(name="description")
	@NotNull
	private String description;

	@Column(name="class_name")
	@NotNull
	private String className;

	@Column(name="test_method")
	@NotNull
	private String testMethod;

	@Column(name="environment_id")
	@NotNull
	private Long environmentId;

	@Column(name="application_id")
	@NotNull
	private Long applicationId;

	@Column(name="testtype_id")
	@NotNull
	private Long testTypeId;

	@Column(name="foundin_build")
	@NotNull
	private Long foundInBuild;
	
	@Column(name="auto_status_id")
	@NotNull
	private Long autoStatusId;

	@Column(name="auto_progress_id")
	@NotNull
	private Long autoProgressId;
	
	@Column(name="added_by")
	@NotNull
	private Long addedBy;

	@Column(name="is_delete")
	@NotNull
	private Integer isDelete;
	
	@Column(name="added_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	public Testcases(long testcasesId) {
		this.testcasesId=testcasesId;
	}
	
	public Testcases(long testcasesId,String testcaseName,String className) {
		this.testcasesId=testcasesId;
		this.testcaseName=testcaseName;
		this.className=className;
	}

	public Testcases() {
	}

	public Long getTestcasesId() {
		return testcasesId;
	}

	public void setTestcasesId(Long testcasesId) {
		this.testcasesId = testcasesId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getTestcaseName() {
		return testcaseName;
	}

	public void setTestcaseName(String testcaseName) {
		this.testcaseName = testcaseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getTestMethod() {
		return testMethod;
	}

	public void setTestMethod(String testMethod) {
		this.testMethod = testMethod;
	}

	public Long getEnvironmentId() {
		return environmentId;
	}

	public void setEnvironmentId(Long environmentId) {
		this.environmentId = environmentId;
	}

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public Long getTestTypeId() {
		return testTypeId;
	}

	public void setTestTypeId(Long testTypeId) {
		this.testTypeId = testTypeId;
	}

	public Long getFoundInBuild() {
		return foundInBuild;
	}

	public void setFoundInBuild(Long foundInBuild) {
		this.foundInBuild = foundInBuild;
	}

	public Long getAutoStatusId() {
		return autoStatusId;
	}

	public void setAutoStatusId(Long autoStatusId) {
		this.autoStatusId = autoStatusId;
	}

	public Long getAutoProgressId() {
		return autoProgressId;
	}

	public void setAutoProgressId(Long autoProgressId) {
		this.autoProgressId = autoProgressId;
	}

	public Long getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Long addedBy) {
		this.addedBy = addedBy;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	
	
}
