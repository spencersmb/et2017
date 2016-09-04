var express = require('express');
var proxy = require('express-http-proxy');

var app = express();


// app.use(proxy('http://www.everytuesday.dev/', {
//   forwardPathAsync: function() {
//     return new Promise(function(resolve, reject) {
//       // ...
//       // eventually
//       resolve( /* your resolved eorwardPath as string */ )
//     });
//   }
// }));

app.use('/', proxy('http://www.everytuesday.dev/', {
  timeout: 2000  // in milliseconds, two seconds
}));

app.listen(3000, function() {
  console.log('Express Server up and running');
});