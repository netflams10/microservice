FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --production

COPY src /usr/src/app/src
# COPY videos /usr/src/app/videos

# RUN ls -la /usr/src/app/src
# RUN ls -la /usr/src/app/videos
# RUN ls -la 

CMD ["npm", "start"]