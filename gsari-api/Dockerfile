FROM node:12.13.0

WORKDIR /usr/src/gsari-api

COPY package.json /usr/src/gsari-api

RUN npm install

COPY . /usr/src/gsari-api

EXPOSE 8080

CMD ["npm", "start"]