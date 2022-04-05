# admin.orders.api.ch.gov.uk

## Summary

* Internal Admin web application tool used to examine orders.
* Would be able to pull up details of orders that have been paid, so an examiner can process it.

## System requirements

* [Git](https://git-scm.com/downloads)
* [Maven](https://maven.apache.org/download.cgi)
* [MongoDB](https://www.mongodb.com/)
* [AWS](https://aws.amazon.com/)
* [NodeJS](https://nodejs.org/en/)

## Architecture

* The admin orders web app has been developed using ExpressJS and TypeScript.
* The template engine used is Nunjucks, to follow the standards set by the GovUK Design System.
* Unit testing has been written be using the Jess testing framework.
* Integration testing will be done in project using CucumberJS, Gherkin & Jess.


## Environment variables

* List of environment variables required to be configured for the application to run.

|Variable                                      |Description                                                  |Example            |
|----------------------------------------------|-------------------------------------------------------------|-------------------|
| To be added.                                 | To be added.                                                | To be added.      |    


## Building the docker image

    mvn compile jib:dockerBuild -Dimage=169942020521.dkr.ecr.eu-west-1.amazonaws.com/local/admin.orders.web.ch.gov.uk

## Running Locally using Docker

1. Clone [Docker CHS Development](https://github.com/companieshouse/docker-chs-development) and follow the steps in the
   README.

1. Enable the `orders` module

1. Run `tilt up` and wait for all services to start

### To make local changes

Development mode is available for this service
in [Docker CHS Development](https://github.com/companieshouse/docker-chs-development).

    ./bin/chs-dev development enable orders

This will clone the admin orders web app into the repositories folder. Any changes to the code, or resources will
automatically trigger a rebuild and reluanch.