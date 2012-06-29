  var http = require('http'),   
      url = require('url'),   
      fs = require('fs'),
      urlfeed = require('./urlfeed.js');

var router = function(req, res, path){
//http://owely.com/4cb8465e29603
  var result = "";
  switch(path){
    case("/process"):
      result = urlfeed.request('http://owely.com/4cb8465e29603', res);
      break;
    default:
      result = fs.readFileSync('./index.html');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8; '});
      res.end(result);

  }

 
};

var renderErPage = function(req,res){
  res.writeHead(400);
  res.end('No path');
};



http.createServer(function (req, res) {
  var newProc = new RegExp('^/(|process)$');
  var pathname = url.parse(req.url).pathname;
  if(newProc.test(pathname)){
    router(req,res, pathname);
  }else{
    renderErPage(req,res);
  }
  router(req,res);
}).listen(5000, '127.0.0.1');


console.log('running at http://127.0.0.1:5000/');
