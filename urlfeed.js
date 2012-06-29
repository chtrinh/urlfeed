var http = require('http'),
    url = require('url') 
  ;

exports.request = function(_url, _request){
  var pageUrl = url.parse(_url);

  http.get({host: pageUrl.host, port: pageUrl.port || 80, path: pageUrl.path, agent:false}, function(res) {
    console.log("Got response: " + res.statusCode);
    var data = '';

    res.addListener('data', function(chunk){ 
        data += chunk; 
    });
    res.addListener('end', function(){
          console.log("Body: " + data);
          _request.writeHead(200, {'Content-Type': 'text/html; charset=utf-8; '});
          _request.end(data);    
    });
  }).on('error', function(e) {
      console.log("Got error: " + e.message);
  });
  console.log("hm");

  return "ok";
}

