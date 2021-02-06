package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.TestBucketTestcases;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestBucketTestcasesRepository extends CrudRepository<TestBucketTestcases, Long> {
    
	 
	
}