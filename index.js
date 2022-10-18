var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var http = require('http')
var order = 1
http.createServer((req,res)=>{
  var data=[]
  if(req.url=="/mail"){
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'crabhousebot@gmail.com',
        pass: 'nbkkjandftkfxttk'
      }
    }));
    req.on('data',(chunk)=>{
      data.push(chunk)
    })
    req.on('end', () => {
      let jsonstring = JSON.parse(data)
      var mailOptions = {
        from: 'crabhousebot@gmail.com',
        to: 'vs803688@gmail.com',
        subject: `Reservation Order⌛ !IMPORTANT Order No: ${order}`,
        text: `Reservation Details:
              1)Name: ${jsonstring.name}
              2)Email: ${jsonstring.name}
              3)Phone: ${jsonstring.phone}
              4)Date: ${jsonstring.date}
              5)Time: ${jsonstring.time}
              6)Location: ${jsonstring.loc}
              7)Number of Guests: ${jsonstring.guestno}
              8)message: ${jsonstring.message}`
      };
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
      res.setHeader('Access-Control-Allow-Headers', req.headers.origin);
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
  
          res.writeHead(405,{'Content-Type':'application/json'})
          res.write(JSON.stringify({"res":error}))
          res.end();
        } else {
          res.writeHead(200,{'Content-Type':'application/json'})
          res.write(JSON.stringify({"res":info.response}))
          res.end();
          order+=1
          // console.log('Email sent: ' + info.response);
        }
      });  // 'Buy the milk'
    })
    
  }
}).listen(process.env.PORT || 3000,'127.0.0.1')
