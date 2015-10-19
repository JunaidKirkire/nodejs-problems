var fs = require('fs');

module.exports = function filteredLs(dirPath, extension, myCallback) {
  fs.readdir(dirPath, function(error, dirData) {
    fileArr = [];
    extension = '.' + extension;
    if(error)
      return myCallback(error, fileArr);

    for(var index = 0; index < dirData.length; index++) {
      lastIndex = dirData[index].lastIndexOf(extension);
      if(dirData[index].substr(lastIndex, extension.length) === extension) {
        fileArr.push(dirData[index]);
      }
    }
    myCallback(error, fileArr);
  });
}