var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })    
var order = 1
var cors = require('cors')

app.use(cors())
app.get('/post', urlencodedParser, function (req, res) {  
   var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'crabhousebot@gmail.com',
          pass: 'nbkkjandftkfxttk'
        }
    }));
    var mailOptions = {
      from: 'crabhousebot@gmail.com',
      to: 'vs803688@gmail.com',
      subject: `Reservation Order⌛ !IMPORTANT Order No: ${order}`,
      text: `Reservation Details:
            1)Name: ${req.query.name}
            2)Email: ${req.query.email}
            3)Phone: ${req.query.phone}
            4)Date: ${req.query.date}
            5)Time: ${req.query.time}
            6)Location: ${req.query.loc}
            7)Number of Guests: ${req.query.guestno}
            8)message: ${req.query.message}`
    };  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.end(JSON.stringify({"res":error}));
      } else {
        res.end(JSON.stringify({"res":info.response}));
        order+=1

      }
    });
})  
app.listen(process.env.PORT || 8000)  