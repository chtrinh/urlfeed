var http = require('http'),
    url = require('url'),
    jsdom = require('jsdom')
  ;

//process function logic goes here
exports.process = function(_url, _response){
  var pageUrl = url.parse(_url);

  http.get({host: pageUrl.host, port: pageUrl.port || 80, path: pageUrl.path, agent:false}, function(res) {
    console.log("Got response: " + res.statusCode);
    var data = '';

    res.addListener('data', function(chunk){ 
        data += chunk; 
    });
    res.addListener('end', function(){
      //check content-type
      var contentType = res.headers['content-type'];

      if(contentType.indexOf('image') == 0){ //then it's  an image doah!
        writeResponse(_response, {images:[{src:_url, width:0, height:0}], texts:[]});
      }else 
      if( contentType.indexOf('text/html') == 0 ){
        processHtml(data);       
      }else{
        writeResponse(_response, {images:[], texts:[]});
      }
    });
  }).on('error', function(e) {
      console.log("Got error: " + e.message);
  });

  function processHtml(data){
          jsdom.env({
            html: data,
            scripts: [
              './helpers/jquery.min.js'
            ]
          }, onParseEnd);

  }


  function onParseEnd(err, window){
    var $ = window.jQuery;
    var responseData = { };

    //collect images
    var images = [];
    var images_src = [];
    $('img').each(function(index, value){
      var image = $(value);
      var width = parseDimention(image.attr('width'));
      var height = parseDimention(image.attr('height'));
      var src = image.attr('src');
      src = src.indexOf('http') == 0 ? src : pageUrl.protocol + '//' + pageUrl.host + src;

      if( (images_src.indexOf(src) == -1) && //check for duplicates 
      ((width> 50 && height > 50) || (width == 0 && height == 0) )){//ignore small images
        images.push({'src': src, 'width': width, 'height': height});
        images_src.push( src );
      }
    });
    responseData['images'] = images;

    //collect text
    texts = extractText($, $('html'));
    texts = sortLongest(texts);
    responseData['texts'] = texts;

    writeResponse(_response, responseData)
  }
}

//helper functions

function writeResponse(response, data){
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8;', 'Access-Control-Allow-Origin' :'*'});
    response.end(JSON.stringify(data));
}

function parseDimention(value){
  value = parseInt(value);
  return isNaN(value) ? 0 : value;
}


function extractText($, el){
  var texts = [];
  var domEl = el.get(0);
  var properTag = ['script','style','meta'].indexOf(el.get(0).tagName.toLowerCase()) == -1;

  if(el.children().length == 0 && el.text().length > 14 && properTag){
    texts.push(el.text());
  }
  el.children().each(function(index, value){
    texts = texts.concat(extractText($, $(value)));
  });
  return texts;
}

function sortLongest(arr){
  return arr.sort(function(a,b){ return b.length - a.length;})
}


//   http.get({host: pageUrl.host, port: pageUrl.port || 80, path: pageUrl.path, agent:false}, function(res) {
//     console.log("Got response: " + res.statusCode);

//     res.addListener('data', function(chunk){ 
//         data += chunk; 
//     });
//     res.addListener('end', function(){
//         console.log('Suceess');        
//     });
//   }).on('error', function(e) {
//       console.log("Got error: " + e.message);
//   });

// var _window;
//   jsdom.env({
//     html: data,
//     scripts: [
//       'http://code.jquery.com/jquery-1.5.min.js'
//     ]
//   }, function (err, window) {
//     _window = window;
//     // jQuery is now loaded on the jsdom window created from 'agent.body'
//   });
