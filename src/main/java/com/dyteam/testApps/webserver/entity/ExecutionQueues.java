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
@Table(name = "execution_queues")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class ExecutionQueues {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="execution_name")
	@NotNull
	private String executionName;

	@Column(name="execution_status")
	private String executionStatus;

	@Column(name="start_email")
	private String startEmail;

	@Column(name="complete_email")
	private String completeEmail;

	@Column(name="isDelete")
	private Integer userRoleId;


	

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getExecutionName() {
		return this.executionName;
	}

	public void setExecutionName(String executionName) {
		this.executionName = executionName;
	}

	public String getExecutionStatus() {
		return this.executionStatus;
	}

	public void setExecutionStatus(String executionStatus) {
		this.executionStatus = executionStatus;
	}

	public String getStartEmail() {
		return this.startEmail;
	}

	public void setStartEmail(String startEmail) {
		this.startEmail = startEmail;
	}

	public String getCompleteEmail() {
		return this.completeEmail;
	}

	public void setCompleteEmail(String completeEmail) {
		this.completeEmail = completeEmail;
	}

	public Integer getUserRoleId() {
		return this.userRoleId;
	}

	public void setUserRoleId(Integer userRoleId) {
		this.userRoleId = userRoleId;
	}


	
		 
}
