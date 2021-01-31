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

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_methods")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class TestMethods {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="test_method_id")
	private Long testMethodId;

	@Column(name="company_id")
	@NotNull
	private Long companyId;

	@Column(name="application_id")
	@NotNull
	private Long applicationId;

	@Column(name="test_method")
	@NotNull
	private String testMethod;

	@Column(name="classname")
	@NotNull
	private String classname;

	@Column(name="description")
	@NotNull
	private String description;

	@Column(name="status")
	@NotNull
	private String status;

	@Column(name="added_by")
	@NotNull
	private Long addedBy;

	@Column(name="added_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date addedWhen;
	
	@Column(name="is_delete")
	@NotNull
	private Integer isDelete;

	public Long getTestMethodId() {
		return testMethodId;
	}

	public void setTestMethodId(Long testMethodId) {
		this.testMethodId = testMethodId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public String getTestMethod() {
		return testMethod;
	}

	public void setTestMethod(String testMethod) {
		this.testMethod = testMethod;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Long addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedWhen() {
		return addedWhen;
	}

	public void setAddedWhen(Date addedWhen) {
		this.addedWhen = addedWhen;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	 
	
	
}
