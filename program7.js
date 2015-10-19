var httpReq = require('http');

httpReq.get(process.argv[2], function(resp) {
  resp.setEncoding('utf8');
  resp.on('data', function(data) {
    console.log(data);
  });
  resp.on('error', function(err) {
    console.error(err);
  });
});
