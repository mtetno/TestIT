# Project Title

This REST application has features like 
On Demand execution of Test cases
Schedule execution of Test cases
Group of Test case and execution or scheduling them
Reports of the executed Test cases in HTML,PDF & Excel format
 

## Getting Started

Steps for starting the project


### Prerequisites

App. en. : JDK1.8+ or JRE 1.8+
Database : MySql Server 5.7+
Browser  : Mozilla firefox , Chrome
OS  	     : Windows, Linux 
Set JAVA_HOME and java should be executable command

### Installing

Copy the jar file & the application.properties file

Refer to application.properties for updating the DB + Application related configurations
Refer to the prop description above it.

java -jar -Dspring.config.location=<Directory path>/application.properties <Directory path>/webserver1-0.0.1-SNAPSHOT.jar



Start the browser open below URL
http://<hostname>:<port>/<application name>/ui/login.html
hostname - machine's hostname
port - configrable in application's prop file
application name  - Configurable in application's app file


## Running the tests

NA

## Deployment

Add additional notes about how to deploy this on a live system

## Built With
 
* [Maven](https://maven.apache.org/) - Dependency Management
mvn clean install

## Front End Code

* You will get all front end code in \webserver1\src\main\resources\static\ui\ this folder


## Authors

* **Yogesh C.** - *Front end code *

* **Deepak S.** - *Back end code*

## License

NA

