package com.dyteam.testApps.webserver.controller;

import com.dyteam.testApps.webserver.Util;
import com.dyteam.testApps.webserver.entity.ExecutionUser;
import com.dyteam.testApps.webserver.repository.CompanyRepository;
import com.dyteam.testApps.webserver.repository.ExecutionUserRepository;
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
@RequestMapping("/executionUser")
public class ExecutionUserController {

  private Logger logger = LoggerFactory.getLogger(this.getClass());
  private CompanyRepository companyRepo;
  private String key;

  public ExecutionUserController(@Autowired CompanyRepository companyRepo,
      @Value("${execution.user.pass.key}") String key) {
    this.companyRepo = companyRepo;
    this.key = key;
  }

  @Autowired
  ExecutionUserRepository executionUserRepo;

  @GetMapping("/fetchAllAccessRoles")
  public ExecutionUser findById(@AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("get ExecutionUser by id=" + loggedInUser.getId());
    ExecutionUser exeUser = executionUserRepo.findById(Long.parseLong(loggedInUser.getId())).orElse(null);
    String decodePassword = Util.getString(companyRepo.getDecodePassword(exeUser.getPassword(), key));
    exeUser.setPassword(decodePassword);
    return exeUser;
  }

  @GetMapping("/all")
  public Iterable<ExecutionUser> findAll() {
    logger.info("get all executionUsers");
    Iterable<ExecutionUser> findAll = executionUserRepo.findAll();
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
  public Iterable<ExecutionUser> findAllCompany(@AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("get all executionUsers" + loggedInUser.getCompanyId());
    Iterable<ExecutionUser> findAllByCompanyId = executionUserRepo.findAllByAddedBy(loggedInUser.getUserId());
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
  public boolean save(@RequestBody ExecutionUser executionUser,
      @AuthenticationPrincipal final LoginUser loggedInUser) {
    logger.info("save executionUser = " + executionUser);
    executionUser.setCompanyId(loggedInUser.getCompanyId());
    executionUser.setAddedBy(loggedInUser.getUserId());
    String rawPassword = executionUser.getPassword();
    String encodedPassword = companyRepo.getEncodedPassword(rawPassword, key);
    executionUser.setPassword(encodedPassword);
    Iterable<ExecutionUser> executionUsers = executionUserRepo.findAllByName(loggedInUser.getUserId(), 
        executionUser.getName());
    boolean isNew = Lists.newArrayList(executionUsers).size() > 0 ? false : true;
    if(isNew){
      executionUserRepo.save(executionUser);
    }else{
      executionUserRepo.updateByName(loggedInUser.getUserId(),executionUser.getName());
    }
    return true;
  }

  @DeleteMapping("/{executionId}")
  public Boolean delete(@PathVariable(value = "executionId") Long executionId,
      @AuthenticationPrincipal final LoginUser loggedInUser) {
    executionUserRepo.updateById(loggedInUser.getUserId(), executionId);
    return true;
  }

  @DeleteMapping("/deleteAll")
  public Boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
    executionUserRepo.updateAll(loggedInUser.getUserId());
    return true;
  }
}
