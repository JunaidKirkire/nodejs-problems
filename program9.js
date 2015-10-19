var http = require('http');

var urls = process.argv.slice(2);
var results = []
var count = 0;

// initialise results array
for (i = 0; i < urls.length; i++) {
  results[i] = null;
}

function getUrl(i) {
  http.get(urls[i], function(resp) {
    var response = '';
    resp.setEncoding('utf8');

    resp.on("data", function(data) {
      response += data;
    });

    resp.on("end", function() {
      results[i] = response;
      var count = 0;

      for (k = 0; k < results.length; k++) {
        if (results[k] != null) count++;
      }

      if(count == 3) {
        for(var j = 0; j < urls.length; j++) {
          console.log(results[j]);
        }
      }
    });
  });
}

for(var counter = 0; counter < urls.length; counter++) {
  getUrl(counter);
}