var PORT=3333
var logger = require('morgan');
var express = require('express');
var favicon = require('serve-favicon');
var app = express();

try{
app.engine('html', require('consolidate').underscore);
app.set('view engine', 'html');
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(logger('dev'));
app.use(express.static('build'));
app.use(function(req, res, next) {
    console.log('request to: ' + req.path);
    res.render('/');
    next();
});

app.listen(PORT);
}catch(e){
    console.log(e);
}
