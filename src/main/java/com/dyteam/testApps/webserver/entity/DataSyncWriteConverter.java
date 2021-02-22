package com.dyteam.testApps.webserver.entity;

import java.io.IOException;

import com.dyteam.testApps.webserver.projection.IStackBar;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.databind.util.Converter;

class DataSyncWriteConverter implements Converter<IStackBar, String> {

    public String convert(IStackBar source) {

        try {
            return new ObjectMapper().writeValueAsString(source);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public JavaType getInputType(TypeFactory typeFactory) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public JavaType getOutputType(TypeFactory typeFactory) {
        // TODO Auto-generated method stub
        return null;
    }
  }
