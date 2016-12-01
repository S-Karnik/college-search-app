var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var databaseUrl = "mongodb://reader:macandcheese314@ds147797.mlab.com:47797/cheese"
var collections = ["colleges"]
var mongojs = require("mongojs")
var db = mongojs(databaseUrl, collections);


//===========================================
//===========AUTO-GENERATED CODE=============
//===========================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

fs.readFile('API_KEY.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString('utf8'));
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//===========================================
//===============BEGIN CODE==================
//===========================================


app.listen(1024, '0.0.0.0', function() {
    console.log('Example app listening on port 1024!');
    var data;
    fs.readFile('deez_data/stanford.json', 'utf8', function(err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        console.log(Object.keys(data["results"][0]))
    });


    db.on('connect', function(err) {
        console.log("I'm in.")
        if(err){
            console.log(err)
        }
    })

    app.set("db", db)
});

module.exports = app;