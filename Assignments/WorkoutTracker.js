var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({layout:'false'});;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_reyrosam',
  password        : '6249',
  database        : 'cs290_reyrosam',
  "dateStrings": true
});
//Setting up database connection from the assignment specificications
pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
  var createString = "CREATE TABLE workouts("+
  "id INT PRIMARY KEY AUTO_INCREMENT,"+
  "name VARCHAR(255) NOT NULL,"+
  "reps INT,"+
  "weight INT,"+
  "date DATE,"+
  "lbs BOOLEAN)";
  pool.query(createString, function(err){
  })
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3894);
//hone page get
app.get('/', function(req, res){
    res.render('home');
});
//home page post
app.post('/', function(req, res){
    res.render('home');
});
//Initial call to pull existing table data via ajax when user first loads page
app.get('/refresh', function(req, res){

  var context = {};
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    //Add true and false to make table look nicer

    for(elem in rows){
      
      if(rows[elem].lbs == 1){
        rows[elem].lbs = "true";
      }else{
        rows[elem].lbs = "false";
      }
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});
//When user submits the form, the table is updated in the database
app.post('/insert', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result.insertId;
    res.send(context);
  });
});
//When user clicks delete on a row, the database deletes that row as well
app.post('/delete', function(req, res, next){
  pool.query("DELETE FROM workouts WHERE id = (?)",[req.body.data], function(err, result){
    if(err){
      next(err);
      return;
    }
    var context = {};
    context.data = req.body.data;
    res.send(context);
  });
});

app.post('/edit', function(req, res){

  var context = {};
  pool.query("UPDATE workouts SET name= ?, reps =?, weight = ?, date = ?, lbs= ?  WHERE id = ?",
  [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit, req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }

    res.send(null);
  });
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
