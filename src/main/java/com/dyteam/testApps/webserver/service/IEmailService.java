package com.dyteam.testApps.webserver.service;

import javax.mail.MessagingException;

import com.dyteam.testApps.webserver.entity.Subscriptions;

import org.springframework.mail.javamail.JavaMailSender;

 

public interface IEmailService {

	void sendSimpleMessage(String to, String subject, String text, Subscriptions company) throws MessagingException;

	void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment,
			JavaMailSender emailSender) throws MessagingException;

	void testEmail(String host, int port, String userName, String password, String protocol, String toEmail)
			throws MessagingException;

}
