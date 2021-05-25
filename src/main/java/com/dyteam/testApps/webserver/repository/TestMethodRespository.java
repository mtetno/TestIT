package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.TestMethods;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestMethodRespository extends CrudRepository<TestMethods, Long> {

	@Transactional
	@Modifying
	@Query("update TestMethods set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
	@Modifying
	@Query("update TestMethods set is_delete = 1 where added_by = :userId AND test_method_id = :id")
	void updateByTestcaseId(Long userId, Long id);

	@Modifying
	@Transactional
	@Query(value = "SELECT a.test_method_id,a.company_id,a.application_id,a.test_method,a.status,b.application_name,c.company_name from test_methods a join application b on b.application_id = a.application_id join subscriptions c on a.company_id = c.id where a.is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);

}
