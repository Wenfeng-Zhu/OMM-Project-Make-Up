const nodemailer = require('nodemailer');
//create a smtp server
const config = {
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: 'ffranco0110@outlook.com',
        pass: 'noncxkbcbchkjytr'
    }
};
//create a smtp client object
const transporter = nodemailer.createTransport(config);
//send email
module.exports = function (mail) {
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('mail sent successfully', info.response);
    });
}