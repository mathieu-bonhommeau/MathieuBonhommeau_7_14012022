FROM nginx:latest

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

EXPOSE 80

VOLUME ./:/usr/share/nginx/html

WORKDIR /usr/share/nginx/html