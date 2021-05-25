package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.TestBucket;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestBucketRepository extends CrudRepository<TestBucket, Long> {

	@Modifying
	@Transactional
	@Query(value = "SELECT a.id,a.environment_id,a.user_role_id,a.name,b.environment_name,c.username from test_buckets a join environment b on b.environment_id = a.environment_id join access_roles c on a.user_role_id = c.access_role_id where a.is_delete = 0 order by a.id desc", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Query(value = "SELECT testcases.*,B.application_name FROM testcases JOIN application AS B ON testcases.application_id = B.application_id where testcases.testcase_id in (SELECT test_buckets_testcases.testcase_id  FROM test_buckets_testcases where bucket_id = :bucketId) ", nativeQuery = true)
	public List<Map<String, Object>> fetchBucketDetails(Long bucketId);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO test_buckets (company_id,name,environment_id,user_role_id,added_by,added_when,is_delete) SELECT company_id,name,environment_id,user_role_id,added_by,added_when,is_delete FROM test_buckets WHERE id = :bucketId", nativeQuery = true)
	public void cloneBucket(Long bucketId);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO test_buckets_testcases (bucket_id,testcase_id) SELECT :bucketId,testcase_id FROM test_buckets_testcases WHERE bucket_id = :bucketId", nativeQuery = true)
	public void cloneBucketTestcases(Long bucketId);

	@Query(value = "SELECT MAX(id) as id FROM test_buckets", nativeQuery = true)
	public Integer getInsertedBucketId();

	@Modifying
	@Transactional
	@Query(value = "update test_buckets set name = :bucketName, environment_id = :environmentId, user_role_id = :userRoleId where id = :bucketId ", nativeQuery = true)
	public void updateBucket(Integer bucketId, String bucketName, Long environmentId, Long userRoleId);

	@Modifying
	@Transactional
	Long deleteByCompanyId(Long companyId);

}