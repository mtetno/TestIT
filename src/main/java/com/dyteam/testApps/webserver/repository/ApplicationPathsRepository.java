package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.ApplicationPaths;
import com.dyteam.testApps.webserver.entity.EmailConfigurations;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface ApplicationPathsRepository extends CrudRepository<ApplicationPaths, Long>{
 
    @Transactional
	@Modifying
	@Query("update ApplicationPaths set is_delete = 1 where added_by = :userId")
	void updateAll(Long userId);

	@Transactional
  	@Modifying
	@Query("update ApplicationPaths set is_delete = 1 where added_by = :userId AND id = :id")
    void updateByApplicationPathId(Long userId,Long id);
	
	@Modifying
    @Transactional
    @Query(value = "SELECT a.*,b.company_name from application_paths a join company b where a.company_id = b.company_id",nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	 
	
}
