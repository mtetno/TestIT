package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ApplicationPaths;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationPathsRepository extends CrudRepository<ApplicationPaths, Long> {

	@Modifying
	@Transactional
	@Query(value = "SELECT a.*,b.company_name from application_paths a join subscriptions b where a.company_id = b.id AND a.is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);

}
