var net = require('net');
var server = net.createServer( function( socket ) {
  var now = new Date();
  var dateString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 
    ' ' + now.getHours() + ':' + now.getMinutes();
  socket.end(dateString);
});

server.listen(process.argv[2]);