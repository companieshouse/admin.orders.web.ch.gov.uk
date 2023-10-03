artifact_name       := admin.orders.web.ch.gov.uk

.PHONY: all
all: build

.PHONY: build
build: clean init submodules build-app

.PHONY: submodules
submodules:
	git submodule init
	git submodule update

.PHONY: build-app
build-app:
	npm run build

.PHONY: clean
clean:
	rm -rf dist/

.PHONY: npm-install
npm-install:
	npm i

.PHONY: gulp-install
gulp-install:
	npm install gulp-cli -g

.PHONY: init
init: npm-install gulp-install

.PHONY: test
test: test-unit test-integration

.PHONY: test-unit
test-unit:
	npm run test

.PHONY: test-integration
test-integration:
	npm run test-integration

.PHONY: test-automation
test-automation:
	npm run test-automation

.PHONY: package
package: build
ifndef version
	$(error No version given. Aborting)
endif
	$(info Packaging version: $(version))
	$(eval tmpdir := $(shell mktemp -d build-XXXXXXXXXX))
	cp -r ./dist $(tmpdir)
	mkdir $(tmpdir)/api-enumerations
	cp ./api-enumerations/*.yml $(tmpdir)/api-enumerations
	cp -r ./package.json $(tmpdir)
	cp -r ./package-lock.json $(tmpdir)
	cd $(tmpdir) && npm i --production
	rm $(tmpdir)/package.json $(tmpdir)/package-lock.json
	cd $(tmpdir) && zip -r ../$(artifact_name)-$(version).zip .
	rm -rf $(tmpdir)

.PHONY: sonar
sonar:
	npm run sonarqube
