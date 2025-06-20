const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
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
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: "Mail Server Test ✔",
    text: "Hello! This is a secure production test."
  })
  .then((info) => console.log("✅ Email sent:", info.response))
  .catch((err) => console.error("❌ Failed to send email:", err));
