FROM node:22-alpine AS base

WORKDIR /app
EXPOSE 3000
RUN npm i -g pnpm

FROM node:18-alpine AS build-angular

RUN mkdir /angular-build
WORKDIR /angular-build
COPY ./web .
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build

FROM node:22-alpine AS build-server

WORKDIR /src

RUN apk update
RUN apk upgrade

COPY ./server/ ./server
WORKDIR "/src/server"
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build:ts
RUN mkdir -p ./dist/public

FROM base AS final
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S application -u 1001
COPY --from=build-server --chown=application:nodejs /src/server/dist .
COPY --from=build-server --chown=application:nodejs /src/server/package.json ./package.json
COPY --from=build-angular --chown=application:nodejs /angular-build/dist/web ./public
RUN pnpm i --prod
USER application
CMD ["pnpm", "start:prod"]
