FROM node:20.18-alpine

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

CMD [ "node", "dist/src/main.js" ]