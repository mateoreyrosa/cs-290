var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//Added the bodyParser module that was not included in the biolerplate
var bodyParser = require('body-parser');
//app.use means that bodyParser will be used each time app.something is called
app.use(bodyParser.json());
//allows complex JSON data to be parsed
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4335);
//Simple get method 
app.get('/',function(req,res){
//reqData is an object that contains the "query" object which holds the query string 
//data in key value pair form. "query" becomes an object thansk to handlebars.
  var reqData = { type : "Get", query : req.query
  }
  res.render('home', reqData);
});
//Simple Post method 
app.post('/', function(req, res){
//This reqdata adds the body property which is another object. For post methods body parser is needed to access req.body otherwise it will be undefined. Any content sent in JSON form to the post method will be parsed by the body parser
  var reqData = { type : "Post", title : "Values in Post Request Body", query: req.query, body: req.body
  }
//Its difficult to pass more params to .render because it essentially serves like a model in MVC which you generally only want to send just one var that encapsulates everything that youre going to need in the front.
  res.render('home', reqData);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
