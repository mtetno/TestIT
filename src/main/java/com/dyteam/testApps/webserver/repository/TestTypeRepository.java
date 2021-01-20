package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.TestType;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface TestTypeRepository extends CrudRepository<TestType, Long>{
 
}
