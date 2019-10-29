FROM node:12.13.0

WORKDIR /usr/src/gsari-client

COPY package.json /usr/src/gsari-client

RUN npm install

COPY . /usr/src/gsari-client

EXPOSE 3000

CMD ["npm", "start"]