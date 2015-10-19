var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile('/Users/Junaid/workspace/nodejs/tail_minus_f/index.html');
});

io.on('connection', function(socket){
  var noOfLines = 0, newNoOfLines = 0;
  
  fs.readFile('test.txt', 'utf8', function(err, data) {
    
    if(err) throw err;
      
      var lines = data.trim().split('\n');
      noOfLines = lines.length;
      var last10Lines = lines.splice(-10);
      
      for(var i = 0; i < last10Lines.length; i++) {
        socket.emit('chat message', last10Lines[i]);
      }
  });

  fs.watch('test.txt', function(event, filename) {
    
    if( filename ) {
      fs.createReadStream(filename)
      .on('data', function(chunk) {

        newNoOfLines = chunk.toString().trim().split('\n').length;
        
        if(newNoOfLines > noOfLines) {
          var diff = newNoOfLines - noOfLines;
          
          var newLines = chunk.toString().trim().split('\n').splice(-diff);
          
          for(var i = 0; i < newLines.length; i++) {
            socket.emit('chat message', newLines[i]);
          }
          
          noOfLines = newNoOfLines;
        }
        
      })
      .on('end', function() {

      });
    } else {
      console.log('no filename');
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});