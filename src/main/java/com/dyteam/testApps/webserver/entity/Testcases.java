package com.dyteam.testApps.webserver.entity;


import java.util.Date;
import java.util.List;
import java.beans.Transient;
import java.util.ArrayList;
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
	
	@Column(name="objective")
	@NotNull
	private String objective;

	@Column(name="class_name")
	private String className;

	@Column(name="test_method")
	private String testMethod;

	@Column(name="application_id")
	@NotNull
	private Long applicationId;

	@Column(name="testtype_id")
	private Long testTypeId;

	@Column(name="auto_status_id")
	private Long autoStatusId;

	@Column(name="auto_progress_id")
	private Long autoProgressId;

	@Column(name="comment")
	private String comment;
	
	@Column(name="added_by")
	@NotNull
	private Long addedBy;

	@Column(name="is_delete")
	@NotNull
	private Integer isDelete;
	
	@Column(name="added_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	public Testcases() {
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

}
