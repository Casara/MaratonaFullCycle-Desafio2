FROM node:14.1-alpine
RUN apk update && apk add --no-cache gcc make libc-dev g++ python
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./dist ./dist
COPY package*.json ./
COPY database.sqlite .
RUN npm i -g @nestjs/cli
RUN npm install --only=production
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
