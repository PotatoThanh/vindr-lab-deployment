FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install
COPY services/ortanc-proxy/. .

EXPOSE 3333
CMD [ "node", "app.js" ]