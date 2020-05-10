# Step 1
FROM node:14.1-alpine AS base
WORKDIR /app
COPY package*.json ./
#COPY package.json ./
#COPY yarn.lock .
COPY database.sqlite .
RUN npm i -g @nestjs/cli

# Step 2
FROM base AS dependencies
RUN apk update && apk add --no-cache gcc make libc-dev g++ python
RUN npm set progress=false && npm config set depth 0
RUN npm install --production
RUN cp -R node_modules /prod_node_modules
RUN npm install
#RUN yarn install --production
#RUN cp -R node_modules /prod_node_modules
#RUN yarn install

# Step 3
FROM dependencies as builder
COPY . .
RUN npm run build
#RUN yarn run build

# Step 4
FROM base AS release
COPY --from=dependencies /prod_node_modules ./node_modules
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
