const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'mail.memoscard.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'qpjoy@memoscard.com',
    pass: 'miemie',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function send({ code, email }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"【PushCode推流助手】Service" <service@memoscard.com>', // sender address
    to: email, // list of receivers
    subject: '欢迎使用「PushCode推流助手」', // Subject line
    text: `尊敬的用户，您好
    欢迎使用「PushCode推流助手」，以下 6 位数字是邮箱验证码，请在应用上填写以通过验证
    验证码：${code}
    请在10分钟内完成认证！
    请添加客服「企业微信」（扫企业微信二维码可直接添加）或邮箱联系我们 service@memoscard.com。
    (如果您从未请求发送邮箱验证码，请忽略此邮件)`, // plain text body
    html: `
    <h3>尊敬的用户，您好</h3>
    <h5>欢迎使用「PushCode推流助手」，以下 6 位数字是邮箱验证码，请在应用上填写以通过验证</h5>
    <h5>验证码：${code}</h5>
    <h5>请在10分钟内完成认证！</h5>
    <h7>请添加客服「企业微信」（扫企业微信二维码可直接添加）或邮箱联系我们 service@memoscard.com。</h7>
    <img src="cid:qiyeweixin@memoscard.com" style="height:207px;width:130px;display:block;" />
    <br/>
    <h7>(如果您从未请求发送邮箱验证码，请忽略此邮件)</h7>
  `, // html body
    // attachments: [
    //   {
    //     file: '企业微信.jpeg',
    //     path: path.join(
    //       __dirname,
    //       isDev
    //         ? '../../../public/assets/img/企业微信.jpeg'
    //         : '../../../../public/assets/img/企业微信.jpeg',
    //     ),
    //     cid: 'qiyeweixin@memoscard.com',
    //   },
    // ],
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

send({
  code: '123456',
  email: '409747494@qq.com',
});
