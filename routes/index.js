const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');
const nodemailer = require("nodemailer");

//upload des images

router.post('/monupload', upload.array('monfichier', 3), function (req, res, next) {
  const err = req.files.reduce((err, file) => {
    if (err == null && file.size < 3000000) {
      try {
        fs.renameSync(file.path, 'public/images/' + file.originalname);
      } catch (fileErr) {
        console.log(fileErr)
        err=fileErr
      }
      return err
    }
  }, (null));
  if (err) {
    res.send('problème durant le déplacement');
  } else {
    res.send('Fichier uploadé avec succès');
  }
})


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
