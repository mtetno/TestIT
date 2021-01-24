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
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "execution_details")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class ExecutionDetails {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="company_id")
	@NotNull
	private Long companyId;

	@Column(name="execution_name")
	@NotNull
	private String executionName;

	@Column(name="environment_id")
	@NotNull
	private Long environmentId;

	@Column(name="testing_environment_id")
	@NotNull
	private Long testingEnvironmentId;

	@Column(name="user_role_id")
	@NotNull
	private Long userRoleId;

	@Column(name="threads")
	@NotNull
	private Long threads;

	@Column(name="schedule_date")
	@NotNull
	private String scheduleDate;

	@Column(name="schedule_time")
	@NotNull
	private String scheduleTime;

	@Column(name="testcases_id")
	@NotNull
	private String testcasesId;

	@Column(name="triggered_by")
	@NotNull
	private Long triggeredBy;

	@Column(name="triggered_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date triggeredWhen;

	@Column(name="test_result")
	private String testResult;

	@Column(name="output")
	private String output;

	@Column(name="reason")
	private String reason;

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

	public String getExecutionName() {
		return executionName;
	}

	public void setExecutionName(String executionName) {
		this.executionName = executionName;
	}

	public Long getEnvironmentId() {
		return environmentId;
	}

	public void setEnvironmentId(Long environmentId) {
		this.environmentId = environmentId;
	}

	public Long getTestingEnvironmentId() {
		return testingEnvironmentId;
	}

	public void setTestingEnvironmentId(Long testingEnvironmentId) {
		this.testingEnvironmentId = testingEnvironmentId;
	}

	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public Long getThreads() {
		return threads;
	}

	public void setThreads(Long threads) {
		this.threads = threads;
	}

	public String getScheduleDate() {
		return scheduleDate;
	}

	public void setScheduleDate(String scheduleDate) {
		this.scheduleDate = scheduleDate;
	}

	public String getScheduleTime() {
		return scheduleTime;
	}

	public void setScheduleTime(String scheduleTime) {
		this.scheduleTime = scheduleTime;
	}

	public String getTestcasesId() {
		return testcasesId;
	}

	public void setTestcasesId(String testcasesId) {
		this.testcasesId = testcasesId;
	}

	public Long getTriggeredBy() {
		return triggeredBy;
	}

	public void setTriggeredBy(Long triggeredBy) {
		this.triggeredBy = triggeredBy;
	}

	public Date getTriggeredWhen() {
		return triggeredWhen;
	}

	public void setTriggeredWhen(Date triggeredWhen) {
		this.triggeredWhen = triggeredWhen;
	}

	public String getTestResult() {
		return testResult;
	}

	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	

	 
}
