FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --production

COPY /storage /usr/src/app/storage
COPY /videos /usr/src/app/videos
COPY /src /usr/src/app/src

CMD [ "npm", "start" ]