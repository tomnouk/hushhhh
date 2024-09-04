FROM node:22-alpine as build
RUN apk add nodejs npm

WORKDIR /usr/src/frontend

COPY package-lock.json ./
COPY package.json ./
COPY vite.config.ts ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
# FROM nginx:1.19-alpine
# RUN apk add npm
# EXPOSE 5173
# COPY --from=build /usr/src/frontend/build /usr/share/nginx/html