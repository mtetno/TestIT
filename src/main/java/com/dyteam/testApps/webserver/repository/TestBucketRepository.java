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
    @Transactional
	@Modifying
	@Query("update TestBucket set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
  	@Modifying
	@Query("update TestBucket set is_delete = 1 where added_by = :userId AND id = :id")
    void updateByTestBucketId(Long userId,Long id);
	
	@Modifying
    @Transactional
    @Query(value = "SELECT a.id,a.name,b.environment_name,c.role from test_buckets a join environment b on b.environment_id = a.environment_id join access_roles c on a.user_role_id = c.access_role_id where a.is_delete = 0",nativeQuery = true)
	public List<Map<String, Object>> fetchAll();
	
}