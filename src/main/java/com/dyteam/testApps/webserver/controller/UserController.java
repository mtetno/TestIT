package com.dyteam.testApps.webserver.controller;

import java.util.Optional;

import com.dyteam.testApps.webserver.entity.User;
import com.dyteam.testApps.webserver.exceptions.ResourceAlreadyExists;
import com.dyteam.testApps.webserver.repository.ApplicationRepository;
import com.dyteam.testApps.webserver.repository.SubscriptionsRepository;
import com.dyteam.testApps.webserver.repository.UserRepository;
import com.dyteam.testApps.webserver.security.LoginUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller takes care of handling all operations related to User
 * 
 * @author deepak
 */
@RestController
@RequestMapping("/user")
public class UserController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	UserRepository userRepo;

	@Value("${project.base.path}")
	String projectBasePath;

	@Autowired
	ApplicationRepository applicationRepo;

	@Autowired
	SubscriptionsRepository subscriptionsRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@GetMapping("/{userId}")
	public User findById(@PathVariable(value = "userId") Long userId) {
		logger.info("get User by id=" + userId);
		Optional<User> findById = userRepo.findById(userId);
		if (findById.isPresent()) {
			return findById.get();
		} else {
			return null;
		}
	}

	@GetMapping("/all")
	public Iterable<User> findAll() {
		logger.info("get all users");
		return userRepo.findAll();
	}

	@GetMapping("/allByCompany")
	public Iterable<User> findAllByCompany(@AuthenticationPrincipal final LoginUser loggedInUser) {
		logger.info("get all users by company");
		return userRepo.findAll(loggedInUser.getCompanyId());
	}

	/**
	 * Create or update User object and create respective dir. structure
	 * 
	 * @param user
	 * @param loggedInUser
	 * @return
	 */
	@PostMapping("/save")
	public User save(@RequestBody User user, @AuthenticationPrincipal final LoginUser loggedInUser)
			throws ResourceAlreadyExists {
		User userAfterSaveOuter = null;
		try {

			if (userRepo.findByUserName(user.getUserName()).isPresent()) {
				throw new ResourceAlreadyExists("Username already exists");
			}
			// boolean isNew = null==user.getUserId();
			// if(isNew == false){
			if (user.getUserId() != null && user.getUserId() > 0) {
				User userDB = userRepo.findById(user.getUserId()).get();
				user.setContact(userDB.getContact());
				user.setUserType(userDB.getUserType());
				user.setAddress(userDB.getAddress());
			}

			user.setAddedBy(loggedInUser.getUserId());
			user.setCompanyId(loggedInUser.getCompanyId());
			// user.setUserId(loggedInUser.getUserId());
			user.setRefUserId(loggedInUser.getUserId());
			String password = user.getPassword();
			user.setPassword(passwordEncoder.encode(password));
			user.setStatus(1);
			user.setfName(user.getfName());
			user.setUserName(user.getUserName());
			user.setlName(user.getlName());
			user.setEmail(user.getEmail());

			userAfterSaveOuter = userRepo.save(user);
			// userRepo.update(user.getfName(),user.getlName(),user.getContact(),
			// user.getStatus();
			// user.getEmail();user.getAddress(),user.getUserId());
			// userAfterSaveOuter = userRepo.save(user);
			// }else{
			// if(userRepo.findByUserName(user.getUserName()).isPresent() == false ){
			// User userDB =
			// userRepo.findById(loggedInUser.getUserId()).get();//userRepo.findById(user.getUserId()).get();
			// userDB.setfName(user.getfName());
			// userDB.setlName(user.getlName());
			// userDB.setEmail(user.getEmail());
			// userDB.setContact(user.getContact());
			// userDB.setUserType(user.getUserType());
			// userDB.setAddress(user.getAddress());
			// user = userDB;

			// userAfterSaveOuter = userRepo.save(user);
			// }else{
			// throw new ResourceAlreadyExists("User Already exists");
			// }
			// }
		} catch (Exception e) {
			throw e;
		}
		return userAfterSaveOuter;
	}

	@PostMapping("/update")
	public User update(@RequestBody User user, @AuthenticationPrincipal final LoginUser loggedInUser)
			throws ResourceAlreadyExists {
		User userAfterSaveOuter = null;
		try {
			User dbUser = new User();
			if (user.getUserId() != null && user.getUserId() > 0) {
				dbUser = userRepo.findById(user.getUserId()).get();

				dbUser.setfName(user.getfName());
				dbUser.setlName(user.getlName());
				dbUser.setEmail(user.getEmail());

				userAfterSaveOuter = userRepo.save(dbUser);
			} else {
				throw new ResourceAlreadyExists("User not found");
			}
		} catch (Exception e) {
			throw e;
		}
		return userAfterSaveOuter;
	}

	@DeleteMapping("/{userId}")
	public Boolean delete(@PathVariable(value = "userId") Long userId,
			@AuthenticationPrincipal final LoginUser loggedInUser) {
		userRepo.deleteById(userId);
		return true;
	}

	@DeleteMapping("/deleteAll")
	public Boolean deleteAll(@AuthenticationPrincipal final LoginUser loggedInUser) {
		userRepo.deleteByCompanyId(loggedInUser.getCompanyId());
		return true;
	}

	/**
	 * Update User password
	 * 
	 * @param oldPassword
	 * @param newPassword
	 * @param loggedInUser
	 * @return
	 */
	@PostMapping("/changePassword")
	public boolean changePassword(@RequestParam("oldPassword") String oldPassword,
			@RequestParam("newPassword") String newPassword, @AuthenticationPrincipal final LoginUser loggedInUser) {
		logger.info("changing the password");
		Long userId = loggedInUser.getUserId();
		User user = userRepo.findById(userId).get();
		if (passwordEncoder.matches(oldPassword, user.getPassword())) {
			String encode = passwordEncoder.encode(newPassword);
			userRepo.updatePassword(encode, userId);
			return true;
		}
		return false;
	}

	/**
	 * Update User's First name,Last name,Email,Contact and Address.
	 * 
	 * @param user
	 * @param loggedInUser
	 * @return
	 */
	@PostMapping("/updateProfile")
	public User updateProfile(@RequestBody User user, @AuthenticationPrincipal final LoginUser loggedInUser) {
		logger.info("updating the logged in user profile");
		User userDb = userRepo.findById(loggedInUser.getUserId()).get();
		userDb.setfName(user.getfName());
		userDb.setlName(user.getlName());
		userDb.setEmail(user.getEmail());
		userDb.setContact(user.getContact());
		userDb.setAddress(user.getAddress());
		return userRepo.save(userDb);
	}

}
