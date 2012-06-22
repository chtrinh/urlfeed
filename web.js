  var http = require('http')
  ,   url = require('url')
  ,   fs = require('fs');

var router = function(req,res){

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World\n');

};
var renderErPage = function(req,res){
  res.writeHead(400);
  res.end('fuck you no path');
};


http.createServer(function (req, res) {
  var newProc = new RegExp('^/?$');
  var pathname = url.parse(req.url).pathname;
  if(newProc.test(pathname)){
    router(req,res);
  }else{
  renderErPage(req,res);
  }
  router(req,res);
}).listen(5000, '127.0.0.1');


console.log('running at http://127.0.0.1:5000/');
