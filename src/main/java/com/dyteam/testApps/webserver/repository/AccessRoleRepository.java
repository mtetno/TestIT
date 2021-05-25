package com.dyteam.testApps.webserver.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.AccessRole;

@Repository
public interface AccessRoleRepository extends CrudRepository<AccessRole, Long> {

	@Modifying
	@Transactional
	@Query("select ar from AccessRole ar where ar.isDelete = 0 AND added_by = :userId")
	Iterable<AccessRole> findAllByAddedBy(Long userId);

	@Modifying
	@Transactional
	@Query("select ar from AccessRole ar where ar.name = :name AND added_by = :userId")
	Iterable<AccessRole> findAllByName(Long userId, String name);

	@Transactional
	@Modifying
	@Query("update AccessRole set is_delete = 0 where added_by = :userId AND name = :name")
	void updateByName(Long userId, String name);

	@Query("select e from AccessRole e where e.isDelete=0")
	Iterable<AccessRole> fetchAll();

	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);

}