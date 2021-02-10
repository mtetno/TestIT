package com.dyteam.testApps.webserver.repository;

import com.dyteam.testApps.webserver.entity.RemindBefore;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface RemindBeforeRepository extends CrudRepository<RemindBefore, Long>{
 
    
	
}
