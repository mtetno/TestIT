package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionDetailsRepository extends CrudRepository<ExecutionDetails, Long> {

    @Modifying
    @Transactional
    Long deleteByCompanyId(Long companyId);

    @Modifying
	@Transactional
	@Query(value ="SELECT a.*,b.test_method,c.email from execution_details a join testcases b on a.testcases_id = b.testcase_id join subscriptions c on a.company_id = c.id where a.is_delete = 0 AND a.company_id = 91 order by a.id desc", nativeQuery = true)
	public List<Map<String, Object>> findAllByCompanyId(Long companyId);
    //AND a. >= CURDATE();

}