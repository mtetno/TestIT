package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.AutomationStatus;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface AutomationStatusRepository extends CrudRepository<AutomationStatus, Long>{
 
}
