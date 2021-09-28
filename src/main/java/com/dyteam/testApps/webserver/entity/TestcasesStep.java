package com.dyteam.testApps.webserver.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "testcases_steps")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class TestcasesStep {

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name="testcase_id")
	@NotNull
	private Long testcase_id;

	@Column(name="step")
	@NotNull
	private String step;

	@Column(name="expected")
	@NotNull
	private String expected;

	public TestcasesStep(String step, String expected) {
		this.step = step;
		this.expected = expected;
	}

	public TestcasesStep() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getTestcase_id() {
		return this.testcase_id;
	}

	public void setTestcase_id(Long testcase_id) {
		this.testcase_id = testcase_id;
	}


	public String getStep() {
		return this.step;
	}

	public void setStep(String step) {
		this.step = step;
	}

	public String getExpected() {
		return this.expected;
	}

	public void setExpected(String expected) {
		this.expected = expected;
	}

	
	
}
