var http = require('http');
var fs = require('fs');

var server = http.createServer( function(request, response) {
  var src = fs.createReadStream(process.argv[3]);
  src.on('open', function() {
    src.pipe(response);
  });

  src.on('error', function(err) {
    response.end(err);
  });
});

server.listen(Number(process.argv[2]));