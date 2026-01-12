# admin.orders.web.ch.gov.uk

## Summary

* Web application used to examine and inspect orders.
* Examiners will be able to inspect details of paid orders 
for further processing.

## System requirements

* [Git](https://git-scm.com/downloads)
* [NodeJS](https://nodejs.org/en/)

## Architecture

* The admin orders web app has been developed using [ExpressJS](https://expressjs.com/) and 
[TypeScript](https://www.typescriptlang.org/).
* The template engine used is [Nunjucks](https://mozilla.github.io/nunjucks/), 
to follow the standards set by the [GovUK Design System](https://design-system.service.gov.uk/).
* Unit tests has been written using the [Jest](https://jestjs.io/) testing framework and [Mocha](https://mochajs.org/).
[Chai](https://www.chaijs.com/) and
[TestContainers](https://github.com/testcontainers/testcontainers-node).

## Build, run and test the application locally

* Run `make` to install required dependencies and build the application.
* Run `npm run start` to start the application.
* Run `npm run test` to run unit tests.
    
## Environment variables

* List of environment variables required to be configured for the application to run.

|Variable   |Description                                      |Example  |
|-----------|-------------------------------------------------|---------|
|PORT       |The port number in which the service is hosted.  | 8741    |    


## Building the docker image

    DOCKER_BUILDKIT=0 docker build --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" --build-arg SSH_PRIVATE_KEY_PASSPHRASE -t 169942020521.dkr.ecr.eu-west-1.amazonaws.com/local/admin.orders.web.ch.gov.uk:latest . 

## Running Locally using Docker

1. Clone [Docker CHS Development](https://github.com/companieshouse/docker-chs-development) and follow the steps in the
   README.

1. Enable the `orders` module

1. Run `chs-dev up` and wait for all services to start

### To make local changes

Development mode is available for this service
in [Docker CHS Development](https://github.com/companieshouse/docker-chs-development).

    ./bin/chs-dev development enable admin-orders-web-ch-gov-uk

This will clone the admin orders web app into the repositories folder. Any changes to the code, or resources will
automatically trigger a rebuild and reluanch.
