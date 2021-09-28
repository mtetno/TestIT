package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestcasesStep;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TestcasesStepRepository extends CrudRepository<TestcasesStep, Long> {

    @Modifying
	@Transactional
	@Query(value = "SELECT * from testcases_steps where testcase_id =:testcaseId", nativeQuery = true)
	public List<Map<String, Object>> fetchAllStepsByTestId(Long testcaseId);


    @Modifying
	@Transactional
	@Query(value = "delete from testcases_steps where testcase_id=:testcaseId", nativeQuery = true)
	public void deleteByTestcaseId(Long testcaseId);

}