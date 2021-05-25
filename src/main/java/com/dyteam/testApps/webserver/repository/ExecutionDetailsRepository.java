package com.dyteam.testApps.webserver.repository;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ExecutionDetails;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionDetailsRepository extends CrudRepository<ExecutionDetails, Long> {

    @Modifying
    @Transactional
    Long deleteByCompanyId(Long companyId);

}