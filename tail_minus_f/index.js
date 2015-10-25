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

function reverse(s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o.trim();
}


var last10Lines = [];

if(last10Lines.length <= 0) {
  
  fs.open(process.argv[2], 'r', function(err, fd) {  
    stream = fs.createReadStream(null, {fd: fd});

    stream.on('data', function(data) {
      var index = data.length - 1;
      var counter = 0;
      var line = '';
      while(index >= 0) {
        val = String.fromCharCode(data[index]);
        line += val;
        if(val == "\n" || index == 0) {
          counter++;
          if(line.trim() !== '')
            last10Lines.push(line.trim());
          line = '';
          if(counter == 10) {
            break;
          }
        }
        index--;
      }

      for(var i = 0; i < last10Lines.length; i++) {
        last10Lines[i] = reverse(last10Lines[i]); 
      }
      last10Lines = last10Lines.reverse();
    });
  });
}

io.on('connection', function(socket){
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