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
@Table(name = "subscriptions")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class Subscriptions {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "company_name")
	@NotNull
	private String companyName;

	@Column(name = "username")
	@NotNull
	private String username;

	@Column(name = "pasword")
	@NotNull
	private String password;

	@Column(name = "testing_environment_id")
	@NotNull
	private String testingEnvironmentId;

	@Column(name = "email")
	@NotNull
	private String email;

	@Column(name = "start_date")
	@NotNull
	private String startDate;

	@Column(name = "end_date")
	@NotNull
	private String endDate;

	@Column(name = "remind_before")
	@NotNull
	private Long remindBefore;

	@Column(name = "threads")
	@NotNull
	private Long threads;

	@Column(name = "added_by")
	@NotNull
	private Long addedBy;

	@Column(name = "added_when", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date addedWhen;

	@Column(name = "is_delete")
	@NotNull
	private Integer isDelete;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTestingEnvironmentId() {
		return testingEnvironmentId;
	}

	public void setTestingEnvironmentId(String testingEnvironmentId) {
		this.testingEnvironmentId = testingEnvironmentId;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Long getRemindBefore() {
		return remindBefore;
	}

	public void setRemindBefore(Long remindBefore) {
		this.remindBefore = remindBefore;
	}

	public Long getThreads() {
		return threads;
	}

	public void setThreads(Long threads) {
		this.threads = threads;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

}
