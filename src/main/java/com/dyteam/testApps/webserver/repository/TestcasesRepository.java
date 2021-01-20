package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.Testcases;
 

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
 
 

@Repository
public interface TestcasesRepository extends CrudRepository<Testcases, Long>{
 
    @Modifying
    @Transactional
    @Query(value = "SELECT a.testcase_id,a.testcase_name,b.application_name,c.environment_name,d.status from testcases a join application b on b.application_id = a.application_id join environment c on a.environment_id = c.environment_id join automation_status d on d.id = a.auto_status_id where a.is_delete = 0",nativeQuery = true)
    public List<Map<String, Object>> fetchAll();
    
    @Transactional
	@Modifying
	@Query("update Testcases set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
  	@Modifying
	@Query("update Testcases set is_delete = 1 where added_by = :userId AND testcase_id = :id")
	void updateByTestcaseId(Long userId,Long id);
}
