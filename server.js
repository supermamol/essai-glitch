console.log("Server log - start again");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Not sure that the next 3 lines are actually needed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public')); 


// This is called when the app is first started
app.get('/', function(request, response) {
  console.log("In app.get (/)");
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Create the database object
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('DEMODB'); // database name

// Process the HTTP POST request for /putData
app.post("/putData", function (request, response) {
  console.log("In app.post (/putData)");

  // build up insert statement. For example: 
  // insert into person(first_name, surname) values ('Joe', 'Bloggs') 
  let insStr = "insert into person(first_name, surname, email, career) values (";
  insStr = insStr + "\'"+request.body.fname+"\', ";
  insStr = insStr + "\'"+request.body.sname+"\', ";
  insStr = insStr + "\'"+request.body.wname+"\', ";
  insStr = insStr + "\'"+request.body.pname+"\') ";
  
  db.run(insStr);

});

// Process the HTTP GET request for /getData
app.get('/getData', function(request, response) {
  console.log("In app.get (/getData)");
  db.all('SELECT * from person', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});


