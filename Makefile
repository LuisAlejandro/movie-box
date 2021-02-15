#!/usr/bin/env make -f
# -*- makefile -*-

SHELL = bash -e


image:
	@docker-compose -p moviebox -f docker-compose.yml build --force-rm --pull

start:
	@docker-compose -p moviebox -f docker-compose.yml up --remove-orphans -d

dependencies: start
	@docker-compose -p moviebox -f docker-compose.yml exec \
		-T --user moviebox moviebox yarn install

update: start
	@docker-compose -p moviebox -f docker-compose.yml exec \
		-T --user moviebox moviebox yarn run update

console: start
	@docker-compose -p moviebox -f docker-compose.yml exec \
		--user moviebox moviebox bash

stop:
	@docker-compose -p moviebox -f docker-compose.yml stop moviebox

down:
	@docker-compose -p moviebox -f docker-compose.yml down \
		--remove-orphans

destroy:
	@docker-compose -p moviebox -f docker-compose.yml down \
		--rmi all --remove-orphans -v