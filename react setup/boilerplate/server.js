var path = '/Users/yosemetie/Dropbox/development/vhosts/www.everytuesday.dev/wp-content/themes/et2017/node_modules/';
var express = require(path + 'express');
var proxy = require(path + 'express-http-proxy');

var app = express();

// app.use(express.static('public'));
app.use('/', proxy('http://www.everytuesday.dev/', {
  timeout: 2000  // in milliseconds, two seconds
}));

app.listen(4000, function () {
  console.log('Express Server up and running');
});