const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.memoscard.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'abuntu@memoscard.com',
    pass: 'Sunrain990.0',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Qpjoy996 👻" <qpjoy996@memoscard.com>', // sender address
    to: 'qpjoy996@163.com, 409747494@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
