
SHELL = bash -e

image:

	docker build --rm -t luisalejandro/movie-box:latest .

start:

	lando start
	lando yarn run update

stop:

	lando stop

destroy:

	lando stop
	lando destroy -y
	lando poweroff
	docker container prune -f
	docker image prune -f
	docker network prune -f
	docker volume prune -f
	lando --clear

console:

	lando bash

clean:

	rm -rf node_modules yarn.lock