FROM node:16.18.0-alpine

WORKDIR /app
COPY package.json ./
RUN NODE_OPTIONS=openssl-legacy-provider npm install
COPY . .

CMD [ "npm", "start", "--openssl-legacy-provider" ]