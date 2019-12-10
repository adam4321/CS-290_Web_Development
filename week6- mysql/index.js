/***********************************************************************
** Author:       Adam Wright
** Description:  Full stack app that connects a workout chart to a node
**               server what renders the front-end with Handlebars and 
**               connects to a MySql database
***********************************************************************/

var express = require("express");
var mysql = require("./local_dbcon.js");
var request = require("request");

var app = express();
var handlebars = require("express-handlebars").create({ default: "main" });
app.set("port", 5000);

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Allow referencing static files without public directory name
app.use(express.static("public"));


// Homepage route
app.get("/", function(req, res, next) {
  var context = {};
  mysql.pool.query("SELECT * FROM `workouts`", function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }

    // Put the mysql data into an array for rendering
    var workoutDbData = [];
    for (var i in rows) {
      workoutDbData.push({
        id: rows[i].id,
        name: rows[i].name,
        reps: rows[i].reps,
        weight: rows[i].weight,
        date: rows[i].date,
        lbs: rows[i].lbs
      });
    }
    context.workouts = workoutDbData;
    res.render("home", context);
  });
});


// Route to insert data
app.get("/insert", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
    [
      req.query.exerciseName,
      req.query.reps,
      req.query.weight,
      req.query.date,
      req.query.lbs
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      context.workouts = result.insertId;
      res.send(JSON.stringify(context));
    }
  );
});


// Route to edit an existing row on update page
app.get("/updateWorkout", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "SELECT * FROM `workouts` WHERE id=?",
    [req.query.id],
    function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }

      // Put the mysql data into an array for rendering
      var workoutDbData = [];
      for (var i in rows) {
        workoutDbData.push({
          id: rows[i].id,
          name: rows[i].name,
          reps: rows[i].reps,
          weight: rows[i].weight,
          date: rows[i].date,
          lbs: rows[i].lbs
        });
      }
      context.workouts = workoutDbData[0];
      res.render("update", context);
    }
  );
});


// Route to return the updated row on the homepage
app.get("/update", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?",
    [
      req.query.exerciseName,
      req.query.reps,
      req.query.weight,
      req.query.date,
      req.query.lbs,
      req.query.id
    ],
    function(err, result) {
      mysql.pool.query("SELECT * FROM `workouts`", function(err, rows, fields) {
        if (err) {
          next(err);
          return;
        }

        // Put the mysql data into an array for rendering
        var workoutDbData = [];
        for (var i in rows) {
          workoutDbData.push({
            id: rows[i].id,
            name: rows[i].name,
            reps: rows[i].reps,
            weight: rows[i].weight,
            date: rows[i].date,
            lbs: rows[i].lbs
          });
        }
        context.workouts = workoutDbData;
        res.render("home", context);
      });
    }
  );
});


// Route to delete a row
app.get("/delete", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "DELETE FROM `workouts` WHERE id = ?",
    [req.query.id],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      mysql.pool.query("SELECT * FROM `workouts`", function(err, rows, fields) {
        if (err) {
          next(err);
          return;
        }
        context.results = JSON.stringify(rows);
        res.render("home", context);
      });
    }
  );
});


// Route to clear the table
app.get('/reset-table',function(req,res,next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ // replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err) {
            context.results = "Table reset";
            res.render('home',context);
        })
    });
});


app.use(function(req,res) {
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
