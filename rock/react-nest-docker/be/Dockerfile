FROM node:20.18-alpine

WORKDIR /app
COPY .npmrc ./
COPY package.json .
RUN npm install

# CMD ["node", "./node_modules/@nestjs/cli/bin/nest.js", "start", "--watch"]
CMD ["npm", "run", "start:dev"]