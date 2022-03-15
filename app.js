// grab express
var express = require("express");

// create an express app
var app = express();

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use('/', express.static(__dirname + '/'));

// http://localhost:8080/
app.get('/', function(req, res){
    res.sendfile('/index.html');
});

app.listen(8080);
console.log('Server has started');