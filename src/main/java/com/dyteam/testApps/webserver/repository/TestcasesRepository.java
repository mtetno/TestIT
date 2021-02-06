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

	@Query("select e from Testcases e where e.companyId = :companyId AND isDelete = 0")
	List<Testcases> findAllByCompanyId(Long companyId);

	@Query(value = "select count(a.auto_progress_id) as count, b.value as name from testcases a join automation_progress b where a.auto_progress_id = b.id group by a.auto_progress_id",nativeQuery = true)
	List<Map<String, Object>> getAutoProgressStats();

	@Query(value = "select count(a.auto_status_id) as count, b.status as name from testcases a join automation_status b where a.auto_status_id = b.id group by a.auto_status_id",nativeQuery = true)
	List<Map<String, Object>> getAutoStatusStats();

	@Query(value = "select count(a.application_id) as count, b.application_name as name from testcases a join application b where a.application_id = b.application_id group by a.application_id",nativeQuery = true)
	List<Map<String, Object>> getApplicationCoverageStats();
}
