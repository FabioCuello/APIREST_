FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ormconfig.json ./ormconfig.json

EXPOSE 3000


CMD [ "npm","run","dev"]