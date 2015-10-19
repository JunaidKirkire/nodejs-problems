var fs = require('fs');
//console.log(fs);
var buf = fs.readFileSync(process.argv[2]);
console.log(buf.toString().split('\n').length - 1);