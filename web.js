  var http = require('http'),   
      url = require('url'),   
      fs = require('fs'),
      urlfeed = require('./urlfeed.js');

var router = function(request, response, path){

  var result = "";
  var url_parts = url.parse(request.url, true);
  
  switch(path){
    case("/process"):
      urlfeed.process(url_parts.query["url"], response);
      break;
    case("/"):
      result = fs.readFileSync('./index.html');
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8; '});
      response.end(result);
      break;
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
}).listen(process.env.PORT || 5000, '127.0.0.1');


console.log('running at http://127.0.0.1:5000/');
