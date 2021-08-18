package com.dyteam.testApps.webserver.repository;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ExecutionQueues;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionQueuesRepository extends CrudRepository<ExecutionQueues, Long> {

   

}