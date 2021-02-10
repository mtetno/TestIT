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

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "test_buckets_testcases")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class TestBucketTestcases {
	 
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

	@Column(name="bucket_id")
	@NotNull
	private Long bucketId;

	@Column(name="testcase_id")
	@NotNull
	private Long testcaseId;

	

	public Long getBucketId() {
		return bucketId;
	}

	public void setBucketId(Long bucketId) {
		this.bucketId = bucketId;
	}

	public Long getTestcaseId() {
		return testcaseId;
	}

	public void setTestcaseId(Long testcaseId) {
		this.testcaseId = testcaseId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
}
