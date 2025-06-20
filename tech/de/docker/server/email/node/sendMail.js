const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter
  .sendMail({
    from: '"Admin" <admin@memoscard.com>',
    to: "409747494@qq.com",
    subject: "Production Email Test",
    text: "Hello! This is a secure production test."
  })
  .then((info) => console.log("Email sent:", info.response))
  .catch((err) => console.error("Email error:", err));
