var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var request = require('request');
  request(
    { method: 'GET'
    , uri: 'http://google.com'
    }
  , function (error, response, body) {
      if(response.statusCode == 200){
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  )

  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});