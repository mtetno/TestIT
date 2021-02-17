package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.EmailConfigurations;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface EmailConfigurationsRepository extends CrudRepository<EmailConfigurations, Long>{
 
    @Transactional
	@Modifying
	@Query("update EmailConfigurations set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
  	@Modifying
	@Query("update EmailConfigurations set is_delete = 1 where added_by = :userId AND id = :id")
    void updateByConfigurationId(Long userId,Long id);
	
	@Modifying
    @Transactional
    @Query(value = "SELECT a.*,b.company_name from email_configurations a join subscriptions b where is_delete = 0 AND a.company_id = b.id",nativeQuery = true)
	public List<Map<String, Object>> fetchAll();
	
}
