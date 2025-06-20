FROM node:20.18-alpine

WORKDIR /app
COPY sendMail.js .

RUN npm install nodemailer

CMD ["node", "sendMail.js"]