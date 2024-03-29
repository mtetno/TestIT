package com.dyteam.testApps.webserver.security;

import static java.util.Objects.requireNonNull;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 
 * @author deepak
 *
 */
public class LoginUser implements UserDetails {
	private static final long serialVersionUID = 2396654715019746670L;

	String id;
	Long userId;
	Long companyId;
	String username;
	String password;
	String profileImage;
	Collection<? extends GrantedAuthority> authorities;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	
	@JsonCreator
	public
	LoginUser(@JsonProperty("id") final String id, @JsonProperty("userId") final Long userId, 
			@JsonProperty("username") final String username,
			@JsonProperty("password") final String password,
			@JsonProperty("companyId") final Long companyId,
			@JsonProperty("profileImage") final String profileImage,
			@JsonProperty("authorities") Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = requireNonNull(id);
		this.userId=requireNonNull(userId);
		this.username = requireNonNull(username);
		this.password = requireNonNull(password);
		this.companyId = requireNonNull(companyId);
		this.profileImage = profileImage;
		this.authorities = authorities;
	}

	public LoginUser(Long userId, Long companyId, String userName) {
		this.userId=userId;
		this.companyId=companyId;
		this.username=userName;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return (Collection<GrantedAuthority>) authorities;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}
	
	public Long getUserId() {
		return userId;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public String getId() {
		return id;
	}
	
	public Long getCompanyId() {
		return companyId;
	}
	
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfileImage() {
		return this.profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public PasswordEncoder getPasswordEncoder() {
		return this.passwordEncoder;
	}

	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}



	@Override
	public String toString() {
		return "LoginUser [id=" + id + ", userId=" + userId + ", companyId=" + companyId + ", username=" + username
				+ ", authorities=" + authorities + "]";
	}
	
	
}
