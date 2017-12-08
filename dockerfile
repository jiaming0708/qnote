# use ubuntu v16.04 be a base
FROM node:8.9-alpine as node-angular-cli
# FROM node:8

MAINTAINER jimmy "jiaming0708@gmail.com"

# Install Node.js
# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt-get install -y nodejs
# RUN apt-get install -y build-essential
#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN npm install -g @angular/cli

RUN ng -v

# RUN ng -v
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app