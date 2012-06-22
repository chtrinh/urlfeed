  var http = require('http')
  ,   fs = require('fs');

var router = function(req,res){

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World\n');

};

http.createServer(function (req, res) {
  router(req,res);
}).listen(5000, '127.0.0.1');


console.log('running at http://127.0.0.1:5000/');
