# This file is a template, and might need editing before it works on your project.
FROM node:latest

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

# replace this with your application's default port
EXPOSE 5000
CMD [ "npm", "start" ]



#FROM node:latest

#RUN mkdir -p /var/www/html
#WORKDIR /var/www/html
#COPY . .

#RUN npm i
#RUN npm run build
#RUN npm i serve -g
