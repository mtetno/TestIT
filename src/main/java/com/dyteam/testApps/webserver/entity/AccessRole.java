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
@Table(name = "access_roles")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class AccessRole {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="access_role_id")
	private Long executionUserId;
	
	@Column(name="company_id")
	@NotNull
	private Long companyId;

	@Column(name="username")
	@NotNull
	private String name;
	
	@Column(name="role")
	@NotNull
	private String role;
	
	@Column(name="password")
	@NotNull
	private String password;
	
	@Column(name="added_by")
	@NotNull
	private Long addedBy;
	
	@Column(name="added_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Column(name="is_delete")
	@NotNull
	private String isDelete;
	
	public AccessRole() {
	}

	public Long getExecutionUserId() {
		return executionUserId;
	}

	public void setExecutionUserId(Long executionUserId) {
		this.executionUserId = executionUserId;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Long addedBy) {
		this.addedBy = addedBy;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(String isDelete) {
		this.isDelete = isDelete;
	}	
}
