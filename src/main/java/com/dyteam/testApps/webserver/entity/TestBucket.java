package com.dyteam.testApps.webserver.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@AllArgsConstructor
@Table(name = "test_buckets")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class TestBucket {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="company_id")
	@NotNull
	private Long companyId;

	@Column(name="name")
	@NotNull
	private String name;

	@Column(name="environment_id")
	@NotNull
	private Long environmentId;

	@Column(name="user_role_id")
	@NotNull
	private Long userRoleId;

	@Column(name="testcases_id")
	@NotNull
	private Long testcasesId;

	@Column(name="added_when",insertable=false,updatable=false)
	@NotNull
	private Date addedWhen;

	@Column(name="added_by")
	@NotNull
	private String addedBy;

	@Column(name="is_delete")
	@NotNull
	private Integer isDelete;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getEnvironmentId() {
		return environmentId;
	}

	public void setEnvironmentId(Long environmentId) {
		this.environmentId = environmentId;
	}

	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public Long getTestcasesId() {
		return testcasesId;
	}

	public void setTestcasesId(Long testcasesId) {
		this.testcasesId = testcasesId;
	}

	public Date getAddedWhen() {
		return addedWhen;
	}

	public void setAddedWhen(Date addedWhen) {
		this.addedWhen = addedWhen;
	}

	public String getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	
 
}
