var http = require('http');
var url = require('url');

var timeJson = function(timeStamp) {
  var date = new Date(timeStamp);
  return JSON.stringify({hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()});
}

var convertToUnixTime = function(timeStamp) {
  var date = new Date(timeStamp);
  return JSON.stringify({unixtime: date.getTime()});
}

var server = http.createServer( function(request, response) {
  urlComponents = url.parse(request.url, true);
  endpoint = urlComponents.pathname;
  time = urlComponents.query.iso;

  if(endpoint === '/api/parsetime') {
    response.end( timeJson(time) );
  }

  if(endpoint === '/api/unixtime') {
    response.end( convertToUnixTime(time) );
  }
});

server.listen( Number( process.argv[2] ) );