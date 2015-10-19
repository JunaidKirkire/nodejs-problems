var fs = require('fs');
var bf = fs.readFile(process.argv[2], printNoOfNewLines);

function printNoOfNewLines(err, data) {
  console.log(data.toString().split('\n').length - 1);
}