package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;

import org.jboss.logging.Param;
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
	@Query(value ="SELECT a.*,b.test_method,c.email from execution_details a join testcases b on a.testcases_id = b.testcase_id join subscriptions c on a.company_id = c.id where a.is_delete = 0 AND a.company_id = :companyId order by a.id desc", nativeQuery = true)
	public List<Map<String, Object>> findAllByCompanyId(Long companyId);


	@Modifying
	@Transactional
	@Query(value ="SELECT a.*,b.test_method,c.email from execution_details a join testcases b on a.testcases_id = b.testcase_id join subscriptions c on a.company_id = c.id where a.is_delete = 0 AND a.company_id = :companyId AND a.schedule_date >= CURDATE()  order by a.id desc", nativeQuery = true)
	public List<Map<String, Object>> findAllFutureExecutionByCompanyId(Long companyId);
	
	@Modifying
	@Transactional
	@Query(value ="SELECT a.*,b.test_method,c.email from execution_details a join testcases b on a.testcases_id = b.testcase_id join subscriptions c on a.company_id = c.id where a.is_delete = 0 AND a.execution_id = (SELECT execution_id FROM execution_details WHERE company_id = :companyId AND schedule_date IS NULL order by id DESC LIMIT 1) ", nativeQuery = true)
	public List<Map<String, Object>> getRecentExecutions(Long companyId);


    @Modifying
	@Transactional
	@Query(value = "delete from execution_details where execution_id = :executionId", nativeQuery = true)
	public void deleteFromExecutionDetailsExecutionId(Long executionId);

    @Modifying
	@Transactional
	@Query(value = "delete from execution_queues where id = :executionId", nativeQuery = true)
	public void deleteFromExecutionQueueExecutionId(Long executionId);

	
    @Modifying
	@Transactional
	@Query(value = "update execution_details set test_result='FAILED' where execution_id = :executionId AND test_result != 'PASSED'", nativeQuery = true)
	public void markForceFailed(Long executionId);

	@Modifying
	@Transactional
	@Query(value = "update execution_details set test_result='QUEUED', schedule_date = CURDATE(), schedule_time = :time where execution_id = :executionId AND test_result != 'PASSED'", nativeQuery = true)
	public void markExecutionRetry(Long executionId, String time);

}