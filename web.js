var express = require('express');

var app = express.createServer(express.logger());

app.post('/process', function(request, response) {
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

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(yourObject));
  response.close();
});

app.get('/', function(request, response){
  
  var sys = require('sys'),
      fs = require('fs'),
      index;
   
  fs.readFile('./index.html', function (err, data) {
      if (err) {
          throw err;
      }
      index = data;
  });

  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write(index);
  response.close();

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});