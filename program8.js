var httpReq = require('http');

httpReq.get(process.argv[2], function(resp) {
  var fullResp = '';
  resp.setEncoding('utf8');
  resp.on('data', function(data) {
    fullResp += data;
    //console.log(data);
  });
  resp.on('error', function(err) {
    if(err)
      fullResp += err;
    //console.error('error is '+err);
  });
  resp.on('end', function(endData) {
    if(endData) 
      fullResp += endData;
    console.log(fullResp.length);
    console.log(fullResp);
  });
});
