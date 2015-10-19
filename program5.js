var fs = require('fs');

var dirPath = process.argv[2];
var extension = '.' + process.argv[3];

//console.log(dirPath);
//console.log(extension);

fs.readdir(dirPath, function(error, dirData) {
  if(error)
    return console.error(error);

  for(var index = 0; index < dirData.length; index++) {
    lastIndex = dirData[index].lastIndexOf(extension);// + 1;
    //console.log(lastIndex + ' ' + extension.length);
    //console.log(dirData[index].substr(lastIndex, extension.length));
    
    if(dirData[index].substr(lastIndex, extension.length) === extension) {
      console.log(dirData[index]);
    }
  }
});