const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const xoauth2 = require('xoauth2');
const hbs = require('hbs') 
// const favicon      = require('serve-favicon');

const AOS = require('aos');


const app = express();





//view engine setup

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//smytatic folder
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use('/public', express.static(path.join(__dirname, 'public')))

//body parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details:</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Inquiry: ${req.body.exampleFormControlSelect1}</li>
  </ul>
  <h3>Message:</h3>
  <p>${req.body.message}</p>
  `


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'chad0441@gmail.com',
      clientId: '858938521960-p82ecna4k5p2mn4n5s7m2145k4k3kep2.apps.googleusercontent.com',
      clientSecret: 'femfm3s5K7gS4S12e4rBRS60',
      refreshToken: '1/ajk1rOdilrALuw_EsZiYcPiIQ7nCnj8wTnlZnT0HMdM'
     
    },
    tls: {
      rejectUnauthorized: false
    }
  
  })
  // setup email data with unicode symbols
  var mailOptions = {
    from: 'ACH Website<achtrucking.kc@gmail.com>',
    to: 'achtruckingjob@gmail.com',
    subject: 'New Contact Request',
    text: 'You have a new message',
    html: output
  }


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent'});
});
});




app.listen(process.env.PORT || 3000, () => console.log('Server started...'));









