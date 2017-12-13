# qnote
2017 T-Challenge game

# docker
## build image
generate the docker image
> docker build -t qnotefrontend .

# angular
## serve
run ng cli
> docker run -p 4000:4200 qnotefrontend ng serve

## build
build ng cli
> docker run -p 4000:4200 qnotefrontend ng build -prod