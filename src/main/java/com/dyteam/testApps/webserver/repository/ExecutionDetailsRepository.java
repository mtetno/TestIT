package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionDetailsRepository extends CrudRepository<ExecutionDetails, Long> {
 
}