FROM node:20.18-alpine AS main_site
WORKDIR /app
COPY .npmrc .
COPY package.json .
RUN yarn install --verbose
COPY . .
RUN yarn build
RUN mv dist pushcode && mkdir dist && mv pushcode dist/

FROM nginx:alpine
COPY --from=main_site /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]