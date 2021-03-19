var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/translate/:text', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  var request = require('request');
  var options = {
    url: api_url,
    form: { 'source': 'ko', 'target': 'en', 'text': req.params.text },
    headers: { 'X-Naver-Client-Id': "omCYkh439Kfoa56Tpjjm", 'X-Naver-Client-Secret': "TIXxlALgvd" }
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});


module.exports = router;
