# builder stage - client
FROM node:16.16.0 as client-builder
ENV NODE_ENV=production
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY /client/. /usr/src/app
RUN npm ci
RUN npm run build

# builder stage
FROM node:16.16.0 AS server-builder
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
WORKDIR /usr/src/app
COPY ["/server/package*.json","/server/tsconfig*.json","/server/prisma","./"]
COPY /server/src ./src
RUN npm ci
RUN npx prisma generate
RUN npm run build

# production builder stage
FROM node:16.16.0 AS prod-builder
WORKDIR /app
ENV NODE_ENV=production
COPY /server/package*.json ./
COPY /server/prisma ./
RUN npm ci --only=production
RUN npx prisma generate

# production stage
FROM node:16.16.0-slim
RUN apt-get update && apt-get install -y openssl
WORKDIR /app/client
COPY --from=client-builder /usr/src/app/build ./build
WORKDIR /app/server
ENV NODE_ENV=production
COPY /server/package*.json ./
COPY --from=server-builder /usr/src/app/dist ./dist
COPY --from=prod-builder /app/node_modules ./node_modules

CMD ["npm","start"]
