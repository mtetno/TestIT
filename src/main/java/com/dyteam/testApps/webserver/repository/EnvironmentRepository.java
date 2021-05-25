package com.dyteam.testApps.webserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dyteam.testApps.webserver.entity.Environment;

@Repository
public interface EnvironmentRepository extends CrudRepository<Environment, Long> {

	@Transactional
	@Modifying
	@Query("select e from Environment e where e.addedBy = :userId AND environment_name = :environmentName")
	List<Environment> findAllByEnvironmentName(Long userId, String environmentName);

	@Transactional
	@Modifying
	@Query("update Environment set is_delete = 0 where added_by = :userId AND environment_name = :environmentName")
	void updateByEnvironmentName(Long userId, String environmentName);

	@Query("select e " + "from Environment e where e.addedBy = :userId AND is_delete = 0")
	List<Environment> findAllByUserId(Long userId);

	@Query("select e from Environment e where e.companyId = :companyId AND e.status=0")
	Iterable<Environment> findAll(Long companyId);

	@Modifying
	@Transactional
	void deleteByCompanyId(Long companyId);
}
