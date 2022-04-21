FROM dockershelf/node:14
LABEL maintainer "Luis Alejandro Martínez Faneyth <luis@collagelabs.org>"

RUN apt-get update && \
    apt-get install sudo gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && \
    apt-get install yarn

RUN useradd -ms /bin/bash moviebox
RUN echo "moviebox ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/moviebox

USER moviebox

RUN mkdir -p /home/moviebox/app

WORKDIR /home/moviebox/app

CMD tail -f /dev/null
