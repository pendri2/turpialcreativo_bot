const nodemailer = require('nodemailer'); // email sender function exports.sendEmail = function(req, res){
    // nodemailer stuff will go here

exports.sendEmail = function(req, res){
    // nodemailer stuff will go here
    var transporter = nodemailer.createTransport({
            host: 'host1.vnzservers.com',
            port: 587,
            secure: true,
            auth: {
                user: 'info@turpialcreativo.com',
                pass: '&-UK{}!xFpl?'
            }
    });

     var mailOptions = {
           from: 'info@turpialcreativo.com',
           to: 'pendri2.2020@gmail.com',
           subject: 'Prueba desde node js',
           text: 'msg'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
        }
    });
};
