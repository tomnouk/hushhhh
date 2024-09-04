FROM node:22-alpine
RUN apk add mysql mysql-client

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["sh", "wait-for-mariadb.sh"]