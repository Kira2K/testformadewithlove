# build stage
FROM node:lts-alpine as build-stage
ARG PORT
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run build
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'