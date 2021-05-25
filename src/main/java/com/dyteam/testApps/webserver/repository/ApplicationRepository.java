package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.Application;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends CrudRepository<Application, Long> {

	@Query("select app from Application app where app.userId = :userId")
	List<Application> findAllByUserId(Long userId);

	@Query("select app from Application app where app.companyId = :companyId")
	List<Application> findAllByCompanyIdId(Long companyId);

	@Query("select app.applicationName from Application app where app.companyId = :companyId")
	List<String> findAllAppNamesByCompanyId(Long companyId);

	Iterable<Application> findAllByCompanyId(Long companyId);

	@Modifying
	@Transactional
	@Query(value = "SELECT a.*,b.company_name from application a join subscriptions b where a.company_id = b.id AND a.is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);
}
