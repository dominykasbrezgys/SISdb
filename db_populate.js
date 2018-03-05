
var mysql = require('mysql');
var faker = require('faker');
var async = require('async');
var randomm = require('random-number-in-range')


//Connect to SQL server with database SISdb
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "SISdb"
});


//1. Connects
con.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to MySQL server!");

    //2. Populating AcademicStaff table
    var values = [];
    for (i = 0; i < 20; i++) {
        firstName = faker.name.firstName();
        lastName = faker.name.lastName();
        username = firstName + lastName;
        email = username + "@host123.com";
        values.push([username, firstName, lastName, email]);
    }
    var sql = "INSERT INTO AcademicStaff (Username, firstName, lastName, email) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("AcademicStaff table has been populated!");

    });

    //3. Populating Course table
    var values = [
        ['Computer Science', 'BSc'],
        ['Computer Science', 'MEng,BSc'],
        ['Advanced Computer Science (Cloud Computing)', 'MSc']
    ];

    var sql = "INSERT INTO Course (CourseName, Qualification) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Course Table has been populated!");
    });

    //4. Populating Student table

    //20 student for each level of BSc Computer Science
    var values = [];
    for (i = 1; i < 4; i++) {
        Level = i;
        for (j = 0; j < 20; j++) {
            Gender = faker.random.number(1);
            FirstName = faker.name.firstName(Gender);
            LastName = faker.name.lastName();
            if (Gender === 1) {
                Gender = 'F';
            } else {
                Gender = 'M';
            }
            EntryYear = new Date().getFullYear() - Level;
            Username = FirstName.substring(0, 2) + EntryYear.toString().substring(2, 4) + LastName.substring(0, 1);
            //Past date with todayYear-18 as reference Date i.e. Student has to be at least 18
            DateOfBirth = faker.date.past(10, new Date().getFullYear() - 18).toISOString().slice(0, 10);
            //All students are from the UK for simplicity
            CountryOfOrigin = "UK";
            CourseID = 1;
            PersonalTutorID = faker.random.number({
                min: 1,
                max: 20
            });
            RegistrationStatus = 'RE';
            values.push([FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus]);
        }
    }
    var sql = "INSERT INTO Student (FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Student table for BSc Computer Science has been populated!");
    });

    //20 student for each level of MEng,BSc Computer Science
    var values = [];
    for (i = 1; i < 5; i++) {
        Level = i;
        for (j = 0; j < 20; j++) {
            Gender = faker.random.number(1);
            FirstName = faker.name.firstName(Gender);
            LastName = faker.name.lastName();
            if (Gender === 1) {
                Gender = 'F';
            } else {
                Gender = 'M';
            }
            EntryYear = new Date().getFullYear() - Level;
            Username = FirstName.substring(0, 2) + EntryYear.toString().substring(2, 4) + LastName.substring(0, 1);
            //Past date with todayYear-18 as reference Date i.e. Student has to be at least 18
            DateOfBirth = faker.date.past(10, new Date().getFullYear() - 18).toISOString().slice(0, 10);
            //All students are from the UK for simplicity
            CountryOfOrigin = "UK";
            CourseID = 2;
            PersonalTutorID = faker.random.number({
                min: 1,
                max: 20
            });
            RegistrationStatus = 'RE';
            values.push([FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus]);
        }
    }
    var sql = "INSERT INTO Student (FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Student table for MEng,BSc Computer Science has been populated!");
    });

    //20 students for MSc Advanced Computer Science (Cloud Computing)
    var values = [];
    Level = 5;
    for (i = 0; i < 20; i++) {
        Gender = faker.random.number(1);
        FirstName = faker.name.firstName(Gender);
        LastName = faker.name.lastName();
        if (Gender === 1) {
            Gender = 'F';
        } else {
            Gender = 'M';
        }
        EntryYear = new Date().getFullYear() - Level;
        Username = FirstName.substring(0, 2) + EntryYear.toString().substring(2, 4) + LastName.substring(0, 1);
        //Past date with todayYear-18 as reference Date i.e. Student has to be at least 18
        DateOfBirth = faker.date.past(10, new Date().getFullYear() - 18).toISOString().slice(0, 10);
        //All students are from the UK for simplicity
        CountryOfOrigin = "UK";
        CourseID = 3;
        PersonalTutorID = faker.random.number({
            min: 1,
            max: 20
        });
        RegistrationStatus = 'RE';
        values.push([FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus]);
    }
    var sql = "INSERT INTO Student (FirstName, LastName, Username, Gender, DateOfBirth, CountryOfOrigin, EntryYear, Level, CourseID, PersonalTutorID, RegistrationStatus) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Student table for MSc Advanced Computer Science (Cloud Computing) has been populated!");
    });


    //5. Populating Module table
    var values = [

        //Modules for BSc Computer Science
        ['COMP1121', 'Databases', 1, 'NoDescription', 10, '2'],
        ['COMP1211', 'Computer Architecture', 1, 'NoDescription', 10, '1'],
        ['COMP1212', 'Computer Processors', 1, 'NoDescription', 10, '2'],
        ['COMP1421', 'Fundamental Mathematical Concepts', 1, 'NoDescription', 10, '1'],
        ['COMP1511', 'Introduction to Discrete Mathematics', 1, 'NoDescription', 10, '2'],
        ['COMP1711', 'Procedural Programming', 1, 'NoDescription', 10, '1'],
        ['COMP1721', 'Object Oriented Programming', 1, 'NoDescription', 10, '2'],
        ['COMP1911', 'Professional Computing', 1, 'NoDescription', 20, '1'],
        ['COMP1921', 'Programming Project', 1, 'NoDescription', 10, '2'],
        ['COMP1011', 'Programming for the Web', 1, 'NoDescription', 10, '1'],
        ['COMP1021', 'Introduction to Web Technologies', 1, 'NoDescription', 10, '2'],

        ['COMP2211', 'Operating Systems', 1, 'NoDescription', 10, '1'],
        ['COMP2221', 'Networks', 1, 'NoDescription', 10, 2],
        ['COMP2321', 'Formal Languages and Finite Automata', 1, 'NoDescription', 10, '2'],
        ['COMP2421', 'Numerical Computation', 1, 'NoDescription', 10, '1'],
        ['COMP2611', 'Artificial Intelligence', 1, 'NoDescription', 10, '2'],
        ['COMP2711', 'Algorithms and Data Structures I', 1, 'NoDescription', 10, '1'],
        ['COMP2721', 'Algorithms and Data Structures II', 1, 'NoDescription', 10, '2'],
        ['COMP2811', 'User Interfaces', 1, 'NoDescription', 10, '1'],
        ['COMP2931', 'Software Engineering', 1, 'NoDescription', 10, '1/2'],
        ['COMP2011', 'Web Application Development', 1, 'NoDescription', 10, '1'],
        ['COMP2021', 'Social and Mobile Web Application Development', 1, 'NoDescription', 10, '2'],

        ['COMP3911', 'Secure Computing', 1, 'NoDescription', 10, '1'],
        ['COMP3931', 'Individual Project', 1, 'NoDescription', 40, '1/2'],
        ['COMP3011', 'Web Services and Web Data', 1, 'NoDescription', 10, '2'],
        ['COMP3211', 'Distributed Systems', 1, 'NoDescription', 10, '1'],
        ['COMP3222', 'Mobile Application Development', 1, 'NoDescription', 10, '2'],
        ['COMP3631', 'Intelligent Systems and Robotics', 1, 'NoDescription', 20, '1/2'],
        ['COMP3736', 'Information Visualization', 1, 'NoDescription', 10, '1'],
        ['COMP3223', 'Cryptography', 1, 'NoDescription', 10, '2'],

        //Modules for BSc,MEng Computer Science
        ['COMP1121', 'Databases', 2, 'NoDescription', 10, '2'],
        ['COMP1211', 'Computer Architecture', 2, 'NoDescription', 10, '1'],
        ['COMP1212', 'Computer Processors', 2, 'NoDescription', 10, '2'],
        ['COMP1421', 'Fundamental Mathematical Concepts', 2, 'NoDescription', 10, '1'],
        ['COMP1511', 'Introduction to Discrete Mathematics', 2, 'NoDescription', 10, '2'],
        ['COMP1711', 'Procedural Programming', 2, 'NoDescription', 10, '1'],
        ['COMP1721', 'Object Oriented Programming', 2, 'NoDescription', 10, '2'],
        ['COMP1911', 'Professional Computing', 2, 'NoDescription', 20, '1'],
        ['COMP1921', 'Programming Project', 2, 'NoDescription', 10, '2'],
        ['COMP1011', 'Programming for the Web', 2, 'NoDescription', 10, '1'],
        ['COMP1021', 'Introduction to Web Technologies', 2, 'NoDescription', 10, '2'],

        ['COMP2211', 'Operating Systems', 2, 'NoDescription', 10, '1'],
        ['COMP2221', 'Networks', 2, 'NoDescription', 10, 2],
        ['COMP2321', 'Formal Languages and Finite Automata', 2, 'NoDescription', 10, '2'],
        ['COMP2421', 'Numerical Computation', 2, 'NoDescription', 10, '1'],
        ['COMP2611', 'Artificial Intelligence', 2, 'NoDescription', 10, '2'],
        ['COMP2711', 'Algorithms and Data Structures I', 2, 'NoDescription', 10, '1'],
        ['COMP2721', 'Algorithms and Data Structures II', 2, 'NoDescription', 10, '2'],
        ['COMP2811', 'User Interfaces', 2, 'NoDescription', 10, '1'],
        ['COMP2931', 'Software Engineering', 2, 'NoDescription', 10, '1/2'],
        ['COMP2011', 'Web Application Development', 2, 'NoDescription', 10, '1'],
        ['COMP2021', 'Social and Mobile Web Application Development', 2, 'NoDescription', 10, '2'],

        ['COMP3911', 'Secure Computing', 2, 'NoDescription', 10, '1'],
        ['COMP3931', 'Individual Project', 2, 'NoDescription', 40, '1/2'],
        ['COMP3011', 'Web Services and Web Data', 2, 'NoDescription', 10, '2'],
        ['COMP3211', 'Distributed Systems', 2, 'NoDescription', 10, '1'],
        ['COMP3222', 'Mobile Application Development', 2, 'NoDescription', 10, '2'],
        ['COMP3631', 'Intelligent Systems and Robotics', 2, 'NoDescription', 20, '1/2'],
        ['COMP3736', 'Information Visualization', 2, 'NoDescription', 10, '1'],
        ['COMP3223', 'Cryptography', 2, 'NoDescription', 10, '2'],

        ['COMP5530M', 'Group Project', 2, 'NoDescription', 30, '1/2'],
        ['COMP5111M', 'Big Data Systems', 2, 'NoDescription', 15, '2'],
        ['COMP5850M', 'Cloud Computing', 2, 'NoDescription', 15, '2'],
        ['COMP5122M', 'Data Science', 2, 'NoDescription', 15, '1'],
        ['COMP5821M', 'Geometric Processing', 2, 'NoDescription', 15, '2'],
        ['COMP5711M', 'Practical Programming', 2, 'NoDescription', 15, '1'],
        ['COMP5870M', 'Image Analysis', 2, 'NoDescription', 15, '2'],

        // //Modules for MSc Advanced Computer Science (Cloud Computing)
        ['COMP5870M', 'MSc Project', 3, 'NoDescription', 60, '1 Jan to 30 Sep'],
        ['COMP5850M', 'Cloud Computing', 3, 'NoDescription', 15, '2'],
        ['COMP5111M', 'Big Data Systems', 3, 'NoDescription', 15, '2'],
        ['COMP5870M', 'Image Analysis', 3, 'NoDescription', 15, '2'],
        ['COMP3211', 'Distributed Systems', 3, 'NoDescription', 10, '1'],
        ['COMP3011', 'Web Services and Web Data', 3, 'NoDescription', 10, '2'],
        ['COMP3911', 'Secure Computing', 3, 'NoDescription', 10, '1'],
        ['COMP5122M', 'Data Science', 3, 'NoDescription', 15, '1'],
        ['COMP3736', 'Information Visualization', 3, 'NoDescription', 10, '1'],
        ['COMP3611', 'Machine Learning', 3, 'NoDescription', 10, '2'],
        ['COMP3910', 'Combinatorial Optimisation',3, 'NoDescription',10, '1']
    ];

    var sql = "INSERT INTO Module (ModuleCode, ModuleName, courseID, Description, NumberOfCredits, Semester) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Module Table has been populated!");
    });
    
    con.end();
});