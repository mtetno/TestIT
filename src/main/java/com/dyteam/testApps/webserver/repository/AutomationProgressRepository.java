package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.AutomationProgress;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface AutomationProgressRepository extends CrudRepository<AutomationProgress, Long>{
 
}
