package com.dyteam.testApps.webserver.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ExecutionUser;

@Repository
public interface ExecutionUserRepository extends CrudRepository<ExecutionUser, Long> {

	@Modifying
	@Transactional
	@Query("select ar from ExecutionUser ar where ar.isDelete = 0 AND added_by = :userId")
	Iterable<ExecutionUser> findAllByAddedBy(Long userId);

	@Modifying
	@Transactional
	@Query("select ar from ExecutionUser ar where ar.name = :name AND added_by = :userId")
	Iterable<ExecutionUser> findAllByName(Long userId, String name);

	@Transactional
	@Modifying
	@Query("update ExecutionUser set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
	@Modifying
	@Query("update ExecutionUser set is_delete = 1 where added_by = :userId AND access_role_id = :id")
	void updateById(Long userId, Long id);

	@Transactional
	@Modifying
	@Query("update ExecutionUser set is_delete = 0 where added_by = :userId AND name = :name")
	void updateByName(Long userId, String name);

}