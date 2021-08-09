var nodemailer = require('nodemailer');

var mailer =(receiver)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vritiemailtesting@gmail.com',
          pass: '*****'
        }
      });
      var content = "Your Email Id is registered";
      var mailOptions = {
        from: 'vritiemailtesting@gmail.com',
        to: receiver.email,
        subject: 'Registered',
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

module.exports = mailer;