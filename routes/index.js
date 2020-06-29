var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

// Création de la méthode de transport de l'email 
var smtpTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "01ed8c67c8a528",
    pass: "b43b1320acc1d2"
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session-in', (req, res, next) => {
  req.session.song = "be bop a lula";
  res.send("connected")
});

router.get('/session-out', (req, res, next) => {
  res.send(req.session.song)
});

router.get('/askForCookiesRecipe', (req, res, next) => {
  smtpTransport.sendMail({
    from: "Deer Wild <deer@wild.com>", // Expediteur
    to: "supergrandma@yopmail.com", // Destinataires
    subject: "Cookieees !", // Sujet
    text: "Pls mamie, j'ai besoin de ta recette de cookie", // plaintext body
    html: "<b>Pls mamie, j'ai besoin de ta recette de cookie</b>" // html body
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send('Send')
    }
  });
});


module.exports = router;
