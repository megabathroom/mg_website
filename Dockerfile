FROM node:16 as build-stage
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY . /app/
ENV PUBLIC_URL=/
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
