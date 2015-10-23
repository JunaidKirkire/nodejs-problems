var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function fetchLogChunk(lines) {
  var logChunk = '';
  for(var i = 0; i < lines.length; i++) {
    logChunk += '<li>'+lines[i] + '</li>';
  }
  return logChunk;
}

var last10Lines = [];

console.log(last10Lines);

if(last10Lines.length <= 0) {
  fs.readFile(process.argv[2], 'utf8', function(err, data) {  
    if(err) throw err;

    var lines = data.trim().split('\n');
    noOfLines = lines.length;
    last10Lines = lines.splice(-10); 
  });
}

io.on('connection', function(socket){
  var noOfLines = 0, newNoOfLines = 0;

  socket.emit('log', fetchLogChunk(last10Lines));
});

fs.open(process.argv[2], 'r', function(err, fd) {
  fs.watchFile(process.argv[2], function(currStat, prevStat) {
    var delta = currStat.size - prevStat.size;
    if (delta <= 0) return;

    fs.read(fd, new Buffer(delta), 0, delta, prevStat.size, function(err, bytes, buffer) {
      
      var lastModifiedLines = buffer.toString().trim().split('\n');

      for(var i = 0; i < lastModifiedLines.length; i++) {
        last10Lines.push(lastModifiedLines[i]);
      }
      last10Lines = last10Lines.splice(-10);

      io.emit('log', fetchLogChunk(lastModifiedLines));

    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});