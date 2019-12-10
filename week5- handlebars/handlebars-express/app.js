/*****************************************************************************
** Author:       Adam Wright
** Description:  Hello world for get and post routes in node with handlebars
**               server-side rendering
*****************************************************************************/

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5000);

// GET route that renders the key value pairs from the url query string
app.get('/',function(req, res) {

    // Create an array of the key value pairs from the url query string
    var urlArray = [];

    for(var key in req.query) {
        urlArray.push({'name': key, 'value': req.query[key]});
    }

    // Create context object from array and render to the DOM
    var context = {};
    context.list = urlArray;
    context.type = 'GET';
    res.render('mainView', context);
});

// POST route that renders the key value pairs from the request body
app.post('/', function(req, res) {

    // Create an array of the key value pairs from the POST body
    var urlArray = [];

    for(var target in req.body) {
        urlArray.push({'name': target, 'value': req.body[target]});
    }

    // Create context object from array and render to the DOM
    var context = {};
    context.list = urlArray;
    context.type = 'POST';
    res.render('mainView', context);
});

app.use(function(req,res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:5000' + app.get('port') + '; press Ctrl-C to terminate.');
});
