package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.EmailTemplates;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTemplateRepository extends CrudRepository<EmailTemplates, Long> {

	@Transactional
	@Modifying
	@Query("update EmailTemplates set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
	@Modifying
	@Query("update EmailTemplates set is_delete = 1 where added_by = :userId AND id = :id")
	void updateByTemplateId(Long userId, Long id);

	@Modifying
	@Transactional
	@Query(value = "SELECT email_templates.*, application.application_name, subscriptions.company_name FROM email_templates JOIN application ON email_templates.company_id = application.application_id JOIN subscriptions ON email_templates.company_id = subscriptions.id where email_templates.is_delete = 0 AND subscriptions.is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

}
