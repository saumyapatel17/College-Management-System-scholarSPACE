const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config({
  path: './sys.env'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.mail_user,
    pass: process.env.mail_pass
  }
});


function credentials(email, subject, content) {
  return {
    from: process.env.mail_user,
    to: email,
    subject: subject,
    html: content
  }
}


const mail = (email, subject, content) => transporter.sendMail(credentials(email, subject, content), function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


module.exports = mail;


