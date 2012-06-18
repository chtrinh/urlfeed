UrlFeed = {
  outputDiv: 0,  
  response: 0,
  init: function(){
    UrlFeed.outputDiv = $('#output'); 
  },
  process: function(url){

    var request = $.ajax({url:'http://google.com',dataType: 'jsonp', success: UrlFeed.processResult, crossDomain: true});
    request.done(function(msg) {
      console.log(msg);
    });

    request.fail(function(jqXHR, textStatus) {
      console.log( "Request failed: " + textStatus );
      console.log(jqXHR);
      UrlFeed.response = jqXHR;
    });
  },
  processResult: function(data){
    console.log("Result");
    console.log(UrlFeed.outputDiv);
    UrlFeed.outputDiv.html(data);
  }

}

$(UrlFeed.init);
