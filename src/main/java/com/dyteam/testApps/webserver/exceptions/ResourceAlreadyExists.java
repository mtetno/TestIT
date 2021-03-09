package com.dyteam.testApps.webserver.exceptions;

public class ResourceAlreadyExists extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public ResourceAlreadyExists(String message) {
        super(message);
    }
}