var mymodule = require('./module1.js');

mymodule(process.argv[2], process.argv[3], function(err, data) {
  if(err)
    return console.error(err);
  for(var index = 0; index < data.length; index++) {
    console.log(data[index]);
  }
});