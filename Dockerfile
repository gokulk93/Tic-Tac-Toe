FROM node:12.6.3-alpine3.9 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine as prod-stage
COPY --from=build-step /app/dist/tic-tac-toe /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
