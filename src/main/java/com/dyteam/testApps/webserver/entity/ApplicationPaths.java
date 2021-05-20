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
@Table(name = "application_paths")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class ApplicationPaths {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "application_path_id")
	private Long id;

	@Column(name = "company_id")
	@NotNull
	private Long companyId;

	@Column(name = "selenium_home")
	@NotNull
	private String seleniumHome;

	@Column(name = "logs_home")
	@NotNull
	private String logsHome;

	@Column(name = "test_data_home")
	@NotNull
	private String testDataHome;

	@Column(name = "screenshot_home")
	@NotNull
	private String screenshotHome;

	@Column(name = "batch_file_home")
	@NotNull
	private String batchFileHome;

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

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getSeleniumHome() {
		return seleniumHome;
	}

	public void setSeleniumHome(String seleniumHome) {
		this.seleniumHome = seleniumHome;
	}

	public String getLogsHome() {
		return logsHome;
	}

	public void setLogsHome(String logsHome) {
		this.logsHome = logsHome;
	}

	public String getTestDataHome() {
		return testDataHome;
	}

	public void setTestDataHome(String testDataHome) {
		this.testDataHome = testDataHome;
	}

	public String getBatchFileHome() {
		return batchFileHome;
	}

	public void setBatchFileHome(String batchFileHome) {
		this.batchFileHome = batchFileHome;
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

	public String getScreenshotHome() {
		return screenshotHome;
	}

	public void setScreenshotHome(String screenshotHome) {
		this.screenshotHome = screenshotHome;
	}

}
