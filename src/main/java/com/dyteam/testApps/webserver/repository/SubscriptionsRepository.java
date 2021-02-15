package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.Subscriptions;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
 

@Repository
public interface SubscriptionsRepository extends CrudRepository<Subscriptions, Long>{
 
    @Transactional
	@Modifying
	@Query("update Subscriptions set is_delete = 1 where added_by = :id")
	void updateAll(Long id);

	@Transactional
  	@Modifying
	@Query("update Subscriptions set is_delete = 1 where added_by = :userId AND id = :id")
    void updateBySubscriptionId(Long userId,Long id);
	
	@Modifying
    @Transactional
    @Query(value = "SELECT a.*,b.company_name from subscriptions a join company b where is_delete = 0 AND a.company_id = b.company_id",nativeQuery = true)
	public List<Map<String, Object>> fetchAll();
	
}
