var mysql = require('mysql');

//Connect to SQL server with database SISdb
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "SISdb"
});

con.connect(function(err) {
  if (err) throw err;

  var entity1 = "AcademicStaff"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity1+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		"Username VARCHAR(255), " +
  		"FirstName VARCHAR(255), " +
  		"LastName VARCHAR(255), " +
  		"Email VARCHAR(255))";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity1+" table created...");
  });

  var entity2 = "Course"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity2+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		"CourseName VARCHAR(255), " +
  		"Qualification VARCHAR(255))";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity2+" table created...");
  });

  var entity3 = "Student"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity3+
  		" ( id INT PRIMARY KEY, "+
  		" FirstName VARCHAR(255), " +
  		" LastName VARCHAR(255), "+
  		" Gender VARCHAR(255), "+
  		" DateOfBirth DATETIME, "+
  		" CountryOfOrigin DATETIME, "+
  		" EntryYear YEAR, "+
  		" Level VARCHAR(255), "+
  		" CourseID INT, "+
  		" PersonalTutorID INT, "+
  		" FinalResult VARCHAR(255) DEFAULT NULL, "+
  		" RegistrationStatus VARCHAR(255), "+
  		" FOREIGN KEY (PersonalTutorID) REFERENCES AcademicStaff(id) ON DELETE SET NULL, "+
  		" FOREIGN KEY (CourseID) REFERENCES Course(id) ON DELETE SET NULL)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity3+" table created...");
  });

  var entity4 = "Module"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity4+
  		" ( ModuleCode VARCHAR(255) PRIMARY KEY, "+
  		" ModuleName VARCHAR(255), " +
  		" CourseID INT, " +
  		" Description VARCHAR(255), "+
  		" NumberOfCredits TINYINT)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity4+" table created...");
  });

  var entity5 = "Coursework"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity5+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" ModuleCode VARCHAR(255), "+
  		" StudentID INT, " +
  		" Number INT, " +
  		" SetDate DATETIME, "+
  		" DueDate DATETIME, "+
  		" ReturnDate DATETIME, "+
  		" Weighting TINYINT, "+
  		" MaxMark TINYINT, "+
  		" RawMark TINYINT, "+
  		" Notes VARCHAR(255), "+
  		" FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE SET NULL, "+
  		" FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE SET NULL)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity5+" table created...");
  });

  var entity6 = "Assessing"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity6+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" AcademicStaffID INT, "+
  		" ModuleCode VARCHAR(255), "+
  		" FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, "+
  		" FOREIGN KEY (AcademicStaffID) REFERENCES AcademicStaff(id) ON DELETE CASCADE)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity6+" table created...");
  });

  var entity7 = "Teaching"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity7+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" AcademicStaffID INT, "+
  		" ModuleCode VARCHAR(255), "+
  		" FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, "+
  		" FOREIGN KEY (AcademicStaffID) REFERENCES AcademicStaff(id) ON DELETE CASCADE)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity7+" table created...");
  });

  var entity8 = "Enrolment"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity8+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" ModuleCode VARCHAR(255), "+
  		" StudentID INT, "+
  		" LevelOfStudy TINYINT, "+
  		" YearTaken YEAR, "+
  		" Semester TINYINT, "+
  		" OverallResult TINYINT, "+
  		" FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, "+
  		" FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity8+" table created...");
  });

  var entity9 = "Transfer"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity9+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" StudentID INT, "+
  		" PreviousCourseID INT, "+
  		" NewCourseID INT, "+
  		" Date DATE, " +
  		" FOREIGN KEY (PreviousCourseID) REFERENCES Course(id) ON DELETE CASCADE, "+
  		" FOREIGN KEY (NewCourseID) REFERENCES Course(id) ON DELETE CASCADE, "+
  		" FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity9+" table created...");
  });

  var entity10 = "Exam"
  var sql = "CREATE TABLE IF NOT EXISTS "+entity10+
  		" ( id INT AUTO_INCREMENT PRIMARY KEY, " +
  		" ModuleCode VARCHAR(255), "+
  		" StudentID INT, "+
  		" Weighting INT, "+
  		" MaxMark TINYINT, "+
  		" RawMark TINYINT, " +
  		" FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, "+
  		" FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(entity10+" table created...");
    con.end();
  });

});