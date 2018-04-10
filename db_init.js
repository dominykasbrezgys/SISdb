//Import npm package for mysql
var mysql = require('mysql');
var databaseName = "SISdb"

//Connect to MySQL server
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
});

//1. Connects
con.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to MySQL server!");

    //2. Creates Database
    con.query("CREATE DATABASE " + databaseName, function(err, result) {
        if (err) throw err;
        console.log("Database " + databaseName + " created");
    });

    //3. Start using the Database
    con.query("USE SISdb", function(err, result) {
        if (err) throw err;
        console.log("Using " + databaseName);
    });

    //4. Creates Tables in the Database
    var entity1 = "AcademicStaff"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity1 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        "Username VARCHAR(255), " +
        "FirstName VARCHAR(255), " +
        "LastName VARCHAR(255), " +
        "Email VARCHAR(255))";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity1 + " table created...");
    });

    var entity2 = "Course"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity2 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        "CourseName VARCHAR(255), " +
        "Qualification VARCHAR(255))";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity2 + " table created...");
    });

    var entity3 = "Student"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity3 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " FirstName VARCHAR(255), " +
        " LastName VARCHAR(255), " +
        " Username VARCHAR(255), " +
        " Gender VARCHAR(255), " +
        " DateOfBirth DATE, " +
        " CountryOfOrigin VARCHAR(255), " +
        " EntryYear YEAR, " +
        " Level VARCHAR(255), " +
        " CourseID INT, " +
        " PersonalTutorID INT, " +
        " FinalResult VARCHAR(255) DEFAULT NULL, " +
        " RegistrationStatus VARCHAR(255), " +
        " FOREIGN KEY (PersonalTutorID) REFERENCES AcademicStaff(id) ON DELETE SET NULL, " +
        " FOREIGN KEY (CourseID) REFERENCES Course(id) ON DELETE SET NULL)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity3 + " table created...");
    });

    var entity4 = "Module"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity4 +
        " ( ModuleCode VARCHAR(255) PRIMARY KEY, " +
        " ModuleName VARCHAR(255), " +
        " Description VARCHAR(255), " +
        " NumberOfCredits TINYINT, " +
        " Semester VARCHAR(255))";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity4 + " table created...");
    });

    var entity5 = "CourseModule"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity5 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " ModuleCode VARCHAR(255), " +
        " CourseID INT, " +
        " FOREIGN KEY (CourseID) REFERENCES Course(id) ON DELETE CASCADE, " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE SET NULL)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity5 + " table created...");
    });

    var entity6 = "Coursework"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity6 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " ModuleCode VARCHAR(255), " +
        " StudentID INT, " +
        " Number INT, " +
        " SetDate DATETIME, " +
        " DueDate DATETIME, " +
        " ReturnDate DATETIME, " +
        " Weighting TINYINT, " +
        " MaxMark TINYINT, " +
        " RawMark TINYINT, " +
        " Notes VARCHAR(255), " +
        " IsApproved VARCHAR(255), " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE SET NULL, " +
        " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE SET NULL)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity6 + " table created...");
    });

    var entity7 = "Assessing"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity7 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " AcademicStaffID INT, " +
        " ModuleCode VARCHAR(255), " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
        " FOREIGN KEY (AcademicStaffID) REFERENCES AcademicStaff(id) ON DELETE CASCADE)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity7 + " table created...");
    });

    var entity8 = "Teaching"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity8 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " AcademicStaffID INT, " +
        " ModuleCode VARCHAR(255), " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
        " FOREIGN KEY (AcademicStaffID) REFERENCES AcademicStaff(id) ON DELETE CASCADE)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity8 + " table created...");
    });

    var entity9 = "Enrolment"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity9 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " ModuleCode VARCHAR(255), " +
        " StudentID INT, " +
        // " LevelOfStudy TINYINT, " +
        " YearTaken YEAR, " +
        " OverallResult TINYINT, " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
        " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity9 + " table created...");
    });

    var entity10 = "Transfer"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity10 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " StudentID INT, " +
        " PreviousCourseID INT, " +
        " NewCourseID INT, " +
        " Date DATE, " +
        " FOREIGN KEY (PreviousCourseID) REFERENCES Course(id) ON DELETE CASCADE, " +
        " FOREIGN KEY (NewCourseID) REFERENCES Course(id) ON DELETE CASCADE, " +
        " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity10 + " table created...");
    });

    var entity11 = "Exam"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity11 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " ModuleCode VARCHAR(255), " +
        " StudentID INT, " +
        " Weighting INT, " +
        " MaxMark TINYINT, " +
        " RawMark TINYINT, " +
        " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
        " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity11 + " table created...");
        //con.end();
    });

    var entity12 = "User"
    var sql = "CREATE TABLE IF NOT EXISTS " + entity12 +
        " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
        " Username VARCHAR(255), " +
        " Type VARCHAR(255), " +
        " Password VARCHAR(255))";

    con.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log(entity12 + " table created...");
    });


    con.end();
});