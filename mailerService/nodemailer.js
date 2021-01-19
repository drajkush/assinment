const nodemailer = require('nodemailer');
// require("dotenv").config();

module.exports = {
    sendmail(to) {
        let mailTransporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASSWORD
            }
        });
  let mailDetails = {
            from: process.env.EMAILUSER,
            to: to,
            subject: 'New mail',
            text: "Congratulation you got mail"
        };
        return new Promise(function (resolve, reject) {
            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs', err);
                    reject(Error(err));
                } else {

                    console.log('Email sent successfully');
                    resolve(0);
                }
            });
        });
    }
}
// module.exports = nodemailers;