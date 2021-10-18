package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.Testcases;
import com.dyteam.testApps.webserver.projection.INames;
import com.dyteam.testApps.webserver.projection.IStackBar;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TestcasesRepository extends CrudRepository<Testcases, Long> {

	@Modifying
	@Transactional
	@Query(value = "SELECT a.testcase_id,a.comment,a.objective,a.class_name,a.test_method,a.application_id,a.testtype_id,a.auto_status_id,a.auto_progress_id,b.application_name,d.status from testcases a join application b on b.application_id = a.application_id left join automation_status d on d.id = a.auto_status_id where a.is_delete = 0 AND a.company_id = :companyId", nativeQuery = true)
	public List<Map<String, Object>> fetchAllByCid(Long companyId);

	@Modifying
	@Transactional
	@Query(value = "SELECT a.testcase_id,a.comment,a.objective,a.class_name,a.test_method,a.application_id,a.testtype_id,a.auto_status_id,a.auto_progress_id,b.application_name,d.status from testcases a join application b on b.application_id = a.application_id left join automation_status d on d.id = a.auto_status_id where a.is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Modifying
	@Transactional
	@Query(value = "SELECT a.testcase_id,a.comment,a.objective,a.class_name,a.test_method,a.application_id,a.testtype_id,a.auto_status_id,a.auto_progress_id,b.application_name,d.status from testcases a join application b on b.application_id = a.application_id left join automation_status d on d.id = a.auto_status_id where a.is_delete = 0 AND a.company_id = :companyId", nativeQuery = true)
	public List<Map<String, Object>> findAllByCompanyId(Long companyId);

	@Query("select e from Testcases e where e.testMethod = :name")
	List<Testcases> findByTestMethod(String name);

	@Query(value = "select count(a.auto_progress_id) as count, b.value as name from testcases a join automation_progress b where a.auto_progress_id = b.id group by a.auto_progress_id", nativeQuery = true)
	List<Map<String, Object>> getAutoProgressStats();

	@Query(value = "select count(a.auto_status_id) as count, b.status as name from testcases a join automation_status b where a.auto_status_id = b.id group by a.auto_status_id", nativeQuery = true)
	List<Map<String, Object>> getAutoStatusStats();

	@Query(value = "select count(a.application_id) as count, b.application_name as name from testcases a join application b where a.application_id = b.application_id group by a.application_id", nativeQuery = true)
	List<Map<String, Object>> getApplicationCoverageStats();

	@Query(value = "SELECT count(a.testcase_id) as count , a.application_id, a.company_id, b.application_name, c.company_name from testcases a join application b join subscriptions c where  a.application_id=:applicationId AND a.company_id=:companyId AND a.application_id = b.application_id AND a.company_id = c.id", nativeQuery = true)
	IStackBar getApplicationVsCompanyStats(Long applicationId, Long companyId);

	@Query("select e from Testcases e group by e.companyId")
	List<Testcases> groupByCompanyId();

	@Query("select e from Testcases e group by e.applicationId")
	List<Testcases> groupByApplicationId();

	@Query(value = "SELECT c.company_name as name,e.company_id as id from testcases e join subscriptions c where e.company_id = c.id group by e.company_id", nativeQuery = true)
	List<INames> getAllCompanyNamesInTestcases();

	@Query(value = "SELECT c.application_name as name,e.application_id as id from testcases e join application c where e.application_id = c.application_id group by e.application_id", nativeQuery = true)
	List<INames> getAllApplicationNames();

	@Query(value = "select a.testcase_id,b.company_name,c.application_name,a.class_name,a.test_method from testcases a join subscriptions b on b.id = a.company_id join application c on c.application_id = a.application_id where a.company_id = :companyId AND a.application_id = :applicationId", nativeQuery = true)
	List<Map<String, Object>> downloadTestcases(Long companyId,Long applicationId);
	
	
	@Modifying
	@Transactional
	@Query(value = "REPLACE INTO testcases (testcase_id,test_method, class_name,company_id,application_id) VALUES(:testcase_id  , :test_method , :class_name, :companyId, :applicationId)", nativeQuery = true)
	void updateBulkTestcases(Long testcase_id,String test_method, String class_name,Long companyId,Long applicationId);

	@Modifying
	@Transactional
	@Query(value = "insert into testcases (test_method,class_name,company_id,application_id) values (:test_method,:class_name,:company_id,:application_id)", nativeQuery = true)
	void insertBulkTestcases(String test_method, String class_name,Long company_id,Long application_id);


	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);

	@Modifying
	@Transactional
	@Query(value = "update testcases set application_id = :applicationId, auto_status_id = :autostatusId where testcase_id = :testCaseId ", nativeQuery = true)
	public void updateTestcase(Long applicationId, Long autostatusId, Long testCaseId);
}
