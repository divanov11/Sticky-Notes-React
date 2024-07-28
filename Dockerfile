FROM node:18.18.2-alpine as build
WORKDIR /app
COPY . .
RUN npm i --silent
RUN npm run build

FROM lipanski/docker-static-website:2.3.0 as release
COPY --from=build /app/dist .
