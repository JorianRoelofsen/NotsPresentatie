var express = require('express');
var router = express.Router();
//stap 2.3
//stap 2.4

/* GET home page. */
router.get('/hello', function (req, res, next) {
  // random number between 1 and 10
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  res.json({
    message: `Your random number is ${randomNumber}`
  });
});

//stap 2.5
router.post('/register', function (req, res, next) {
  res.json({
    message: 'Welcome ' + req.body.mail + ' you are registered!'
  });
});

module.exports = router;
