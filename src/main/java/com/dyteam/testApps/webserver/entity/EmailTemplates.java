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
@Table(name = "email_templates")
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(Include.NON_NULL)
public class EmailTemplates {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="template_id")
	private Long id;

	@Column(name="company_id")
	@NotNull
	private Long companyId;

	@Column(name="template_type")
	@NotNull
	private String templateType;

	@Column(name="content")
	@NotNull
	private String content;

	@Column(name="legend")
	@NotNull
	private String legend;

	@Column(name="added_by")
	@NotNull
	private Long addedBy;

	@Column(name="added_when",insertable=false,updatable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date addedWhen;
	
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

	public String getTemplateType() {
		return templateType;
	}

	public void setTemplateType(String templateType) {
		this.templateType = templateType;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getLegend() {
		return legend;
	}

	public void setLegend(String legend) {
		this.legend = legend;
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
