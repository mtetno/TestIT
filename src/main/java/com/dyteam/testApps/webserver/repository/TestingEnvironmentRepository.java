package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.TestingEnvironment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface TestingEnvironmentRepository extends CrudRepository<TestingEnvironment, Long>{
 
}
