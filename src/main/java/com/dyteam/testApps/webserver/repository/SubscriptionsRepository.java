package com.dyteam.testApps.webserver.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dyteam.testApps.webserver.entity.Subscriptions;
import com.dyteam.testApps.webserver.projection.ISubscription;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionsRepository extends CrudRepository<Subscriptions, Long> {

	@Transactional
	@Modifying
	@Query(value = "update subscriptions set company_name=:companyName,username=:username,pasword=:password,email=:email,testing_environment_id=:envId,remind_before=:remindBefore,threads =:threads,end_date=:endDate,start_date=:startDate where id = :id", nativeQuery = true)
	void update(String companyName, String username, String password, String email, String envId, Long remindBefore,
			Long threads, String endDate, String startDate, Long id);

	@Modifying
	@Transactional
	@Query(value = "SELECT * from subscriptions where is_delete = 0", nativeQuery = true)
	public List<Map<String, Object>> fetchAll();

	@Modifying
	@Transactional
	@Query(value = "SELECT * from subscriptions where is_delete = 0", nativeQuery = true)
	Iterable<Subscriptions> find();

	@Query(value = "SELECT HEX(AES_ENCRYPT(:password,:key))", nativeQuery = true)
	public abstract String getEncodedPassword(@Param("password") String password, @Param("key") String key);

	@Query(value = "SELECT AES_DECRYPT(UNHEX(:password),:key)", nativeQuery = true)
	public abstract String getDecodePassword(@Param("password") String password, @Param("key") String key);

	@Query(value = "SELECT AES_DECRYPT(UNHEX('4E56E73DF470BAF28D4C4F123F04DE5C'),'theKey')", nativeQuery = true)
	public abstract String getPassword();

	@Query("select c.companyName from Subscriptions c where c.id = :companyId")
	public String getName(Long companyId);

	@Query(value = "select a.company_name,b.selenium_home from subscriptions a join application_paths b where a.id=77 AND a.id = b.company_id", nativeQuery = true)
	public ISubscription getCompanyInfoForFolder(Long companyId);

}
