package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.Testcases;
import com.dyteam.testApps.webserver.entity.TestcasesAssignments;
import com.dyteam.testApps.webserver.projection.INames;
import com.dyteam.testApps.webserver.projection.IStackBar;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TestcasesAssignementsRepository extends CrudRepository<TestcasesAssignments, Long> {

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO  testcases_assignments (company_id, testcase_id) SELECT :companyId,:testCaseId WHERE (SELECT COUNT(*) FROM testcases_assignments WHERE company_id=:companyId AND testcase_id=:testCaseId) = 0", nativeQuery = true)
	public void insertInto(Long companyId,Long testCaseId);
	
	
	@Modifying
	@Transactional
	@Query(value = "delete from testcases_assignments where testcase_id=:testCaseId", nativeQuery = true)
	public void deleteAssignmentsWithTestCaseId(Long testCaseId);

	@Modifying
	@Transactional
	@Query(value = "SELECT a.*,b.company_name FROM testitapps.testcases_assignments a join subscriptions b on a.company_id=b.id;", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();
	
}
