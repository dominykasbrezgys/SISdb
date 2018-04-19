
var stdin = process.openStdin();

var dbPassword;

console.log("Please enter password of the database, which can obtained from the project report: ");

stdin.addListener("data", function(dbPassword) {
    console.log("you entered: "+dbPassword);
  
    //Import npm package for mysql
    var mysql = require('mysql');
    var databaseName = "sql2233335"

    //Connect to MySQL server
    var con = mysql.createConnection({
        host: "sql2.freemysqlhosting.net",
        user: "sql2233335",
        password: dbPassword.toString().trim(),
        database: databaseName
    });

    //1. Connects
    con.connect(function(err) {
        if (err) throw err;
        console.log("Successfully connected to MySQL server!");

        // //2. Creates Database
        // con.query("CREATE DATABASE " + databaseName, function(err, result) {
        //     if (err) throw err;
        //     console.log("Database " + databaseName + " created");
        // });

        // //3. Start using the Database
        // con.query("USE "+databaseName, function(err, result) {
        //     if (err) throw err;
        //     console.log("Using " + databaseName);
        // });

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
            "Duration TINYINT, "+
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
            " CourseworkNumber TINYINT, " +
            " SetDate DATE, " +
            " DueDate DATE, " +
            " ReturnDate DATE, " +
            " Weighting TINYINT, " +
            " MaxMark TINYINT, " +
            " Notes VARCHAR(255), " +
            " IsApproved TINYINT DEFAULT 0, " +
            " FileName VARCHAR(255), " +
            " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE SET NULL)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity6 + " table created...");
        });

        var entity7 = "CourseworkMark"
        var sql = "CREATE TABLE IF NOT EXISTS "+entity7+ 
            " (id INT AUTO_INCREMENT PRIMARY KEY, " +
            " CourseworkID INT, " +
            " StudentID INT, " +
            " RawMark TINYINT, " +
            " FOREIGN KEY (CourseworkID) REFERENCES Coursework (id) ON DELETE CASCADE, " +
            " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity7 + " table created...");
        });

        var entity8 = "Assessing"
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

        var entity9 = "Teaching"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity9 +
            " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
            " AcademicStaffID INT, " +
            " ModuleCode VARCHAR(255), " +
            " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
            " FOREIGN KEY (AcademicStaffID) REFERENCES AcademicStaff(id) ON DELETE CASCADE)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity9 + " table created...");
        });

        var entity10 = "Enrolment"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity10 +
            " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
            " ModuleCode VARCHAR(255), " +
            " StudentID INT, " +
            " LevelOfStudy TINYINT, " +
            " YearTaken YEAR, " +
            " OverallResult TINYINT, " +
            " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE, " +
            " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity10 + " table created...");
        });

        var entity11 = "Transfer"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity11 +
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
            console.log(entity11 + " table created...");
        });

        var entity12 = "Exam"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity12 +
            " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
            " ModuleCode VARCHAR(255), " +
            " Weighting INT, " +
            " MaxMark TINYINT, " +
            " IsApproved TINYINT, " +
            " FileName VARCHAR(255), " +
            " FOREIGN KEY (ModuleCode) REFERENCES Module(ModuleCode) ON DELETE CASCADE)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity12 + " table created...");
            //con.end();
        });

        var entity13 = "ExamMark"
        var sql = "CREATE TABLE IF NOT EXISTS "+entity13+ 
            " (id INT AUTO_INCREMENT PRIMARY KEY, " +
            " ExamID INT, " +
            " StudentID INT, " +
            " RawMark TINYINT, " +
            " FOREIGN KEY (ExamID) REFERENCES Exam (id) ON DELETE CASCADE, " +
            " FOREIGN KEY (StudentID) REFERENCES Student(id) ON DELETE CASCADE)";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity13 + " table created...");
        });

        var entity14 = "User"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity14 +
            " ( id INT AUTO_INCREMENT PRIMARY KEY, " +
            " Username VARCHAR(255), " +
            " Type VARCHAR(255), " +
            " Password VARCHAR(255))";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity14 + " table created...");
        });

        var entity15 = "SemesterWeek"
        var sql = "CREATE TABLE IF NOT EXISTS " + entity15 +
            " (Year YEAR," +
            " SemesterNumber TINYINT," +
            " WeekNumber TINYINT," +
            " StartDate DATE," +
            " EndDate DATE," +
            " PRIMARY KEY (Year, SemesterNumber,WeekNumber,StartDate,EndDate))";

        con.query(sql, function(err, result, fields) {
            if (err) throw err;
            console.log(entity15 + " table created...");
        });


        con.end();
    });
});