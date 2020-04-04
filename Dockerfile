FROM dockershelf/node:13
LABEL maintainer "Luis Alejandro Martínez Faneyth <luis@luisalejandro.org>"

RUN apt-get update && \
    apt-get install net-tools netcat-openbsd

RUN route -n | awk '/^0.0.0.0/ {print $2}' > /tmp/host_ip.txt
RUN echo "HEAD /" | nc `cat /tmp/host_ip.txt` 8000 | grep squid-deb-proxy \
    && (echo "Acquire::http::Proxy \"http://$(cat /tmp/host_ip.txt):8000\";" > /etc/apt/apt.conf.d/30proxy) \
    || echo "No squid-deb-proxy detected on docker host"

RUN apt-get update && \
    apt-get install gnupg sudo

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && \
    apt-get install yarn

RUN useradd -ms /bin/bash node
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node
