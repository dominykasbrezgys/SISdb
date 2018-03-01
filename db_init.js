var mysql = require('mysql');

//Connect to SQL server
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
});
