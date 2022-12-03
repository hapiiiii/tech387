const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
  var sqlUser = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), registered datetime, last_login datetime DEFAULT CURRENT_TIMESTAMP)";
  connection.query(sqlUser, function (err, result) {
    if (err) throw err;
  });

  var sqlCourseCategory = "CREATE TABLE IF NOT EXISTS courseCategory (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), description TEXT)";
  connection.query(sqlCourseCategory, function (err, result) {
    if (err) throw err;
  });

  var sqlCourse = "CREATE TABLE IF NOT EXISTS course (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), description TEXT, link VARCHAR(255), courseCategoryId VARCHAR(255), FOREIGN KEY (courseCategoryId) REFERENCES courseCategory(id))";
  connection.query(sqlCourse, function (err, result) {
    if (err) throw err;
  });

  var sqlJWTToken = "CREATE TABLE IF NOT EXISTS jwtToken (token VARCHAR(255), email VARCHAR(255))";
  connection.query(sqlJWTToken, function (err, result) {
    if (err) throw err;
  });


});

module.exports = connection;