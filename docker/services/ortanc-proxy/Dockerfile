FROM node:16
WORKDIR /usr/src/app
COPY services/ortanc-proxy/package.json ./
COPY services/ortanc-proxy/yarn.lock ./

RUN yarn install
COPY services/ortanc-proxy/. .

EXPOSE 3333
CMD [ "node", "app.js" ]