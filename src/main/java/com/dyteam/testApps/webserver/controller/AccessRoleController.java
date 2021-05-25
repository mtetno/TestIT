package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.Util;
import com.dyteam.testApps.webserver.entity.AccessRole;

import com.dyteam.testApps.webserver.repository.AccessRoleRepository;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
import com.dyteam.testApps.webserver.security.LoginUser;
import com.google.common.collect.Lists;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller takes care of handling all operations related to Execution
 * user
 * 
 * @author deepak
 */
@RestController
@RequestMapping("/accessRole")
public class AccessRoleController {

  private Logger logger = LoggerFactory.getLogger(this.getClass());
  private SubscriptionsRepository subscriptionsRepository;
  private String key;

  public AccessRoleController(@Autowired SubscriptionsRepository subscriptionsRepository,
      @Value("${execution.user.pass.key}") String key) {
    this.subscriptionsRepository = subscriptionsRepository;
    this.key = key;
  }

  @Autowired
  AccessRoleRepository executionUserRepo;

  @GetMapping("/fetchAllAccessRoles")
  public AccessRole findById(@AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("get ExecutionUser by id=" + loggedInUser.getId());
    AccessRole exeUser = executionUserRepo.findById(Long.parseLong(loggedInUser.getId())).orElse(null);
    String decodePassword = Util.getString(subscriptionsRepository.getDecodePassword(exeUser.getPassword(), key));
    exeUser.setPassword(decodePassword);
    return exeUser;
  }

  @GetMapping("/all")
  public Iterable<AccessRole> findAll() {
    logger.info("get all executionUsers");
    Iterable<AccessRole> findAll = executionUserRepo.fetchAll();
    findAll.forEach(eu -> eu.setPassword(null));
    return findAll;
  }

  /**
   * Fetches list of all Execution user for a Company
   * 
   * @param loggedInUser
   * @return
   */
  @GetMapping("/allByCompany")
  public Iterable<AccessRole> findAllCompany(@AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("get all executionUsers" + loggedInUser.getCompanyId());
    Iterable<AccessRole> findAllByCompanyId = executionUserRepo.findAllByAddedBy(loggedInUser.getUserId());
    findAllByCompanyId.forEach(eu -> eu.setPassword(null));
    return findAllByCompanyId;
  }

  /**
   * Create or update Execution user
   * 
   * @param executionUser
   * @param loggedInUser
   * @return
   */
  @PostMapping("/save")
  public boolean save(@RequestBody AccessRole executionUser, @AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("save executionUser = " + executionUser);
    executionUser.setCompanyId(loggedInUser.getCompanyId());
    executionUser.setAddedBy(loggedInUser.getUserId());
    String rawPassword = executionUser.getPassword();
    String encodedPassword = subscriptionsRepository.getEncodedPassword(rawPassword, key);
    executionUser.setPassword(encodedPassword);
    Iterable<AccessRole> executionUsers = executionUserRepo.findAllByName(loggedInUser.getUserId(),
        executionUser.getName());
    boolean isNew = Lists.newArrayList(executionUsers).size() > 0 ? false : true;
    if (isNew) {
      executionUserRepo.save(executionUser);
    } else {
      executionUserRepo.updateByName(loggedInUser.getUserId(), executionUser.getName());
    }
    return true;
  }

  @DeleteMapping("/{executionId}")
  public Boolean delete(@PathVariable(value = "executionId") Long executionId,
      @AuthenticationPrincipal final LoginUser loggedInUser) {
    executionUserRepo.deleteById(executionId);
    return true;
  }

}
