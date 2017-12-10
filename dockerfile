FROM node:9.2.0-alpine

MAINTAINER jimmy "jiaming0708@gmail.com"

#Linux setup

RUN apk update \
  && apk add --update alpine-sdk python \
  && yarn global add @angular/cli@1.5.5 \
  && ng set --global packageManager=yarn \
  && apk del alpine-sdk python \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache clean --force \
  && yarn cache clean \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN ng -v

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD ./qnote /app

RUN npm install