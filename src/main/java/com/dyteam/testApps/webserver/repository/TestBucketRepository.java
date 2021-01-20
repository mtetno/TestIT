package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.TestBucket;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestBucketRepository extends CrudRepository<TestBucket, Long> {

	
}