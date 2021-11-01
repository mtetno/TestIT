package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import com.dyteam.testApps.webserver.entity.TestingEnvironment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface TestingEnvironmentRepository extends CrudRepository<TestingEnvironment, Long>{
 
    @Query(value = "SELECT * FROM testing_environment WHERE id IN (SELECT testing_environment_id from subscriptions_testing_environment_mapping where id = :companyId)", nativeQuery = true)
	List<Map<String, Object>> getTestingEnvironmentByCompanyId(Long companyId);

}
