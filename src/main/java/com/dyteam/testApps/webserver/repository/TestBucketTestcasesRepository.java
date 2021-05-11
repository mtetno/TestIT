package com.dyteam.testApps.webserver.repository;

import java.util.List;

import com.dyteam.testApps.webserver.entity.TestBucketTestcases;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestBucketTestcasesRepository extends CrudRepository<TestBucketTestcases, Long> {

    @Query(value = "select * from test_buckets_testcases where bucket_id = :bucketId", nativeQuery = true)
    List<TestBucketTestcases> findAllByBucketId(Long bucketId);

}