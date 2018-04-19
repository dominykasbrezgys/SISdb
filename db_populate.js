
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
    for (i = 0; i < 40; i++) {
        firstName = faker.name.firstName();
        lastName = faker.name.lastName();
        username = firstName.replace(/'/g, '').toLowerCase() + "." + lastName.replace(/'/g, '').toLowerCase();
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
        ['Computer Science', '3', 'BSc'],
        ['Computer Science','4', 'MEng,BSc'],
        ['Advanced Computer Science (Cloud Computing)', '1' ,'MSc']
    ];

    var sql = "INSERT INTO Course (CourseName, Duration, Qualification) VALUES ?";
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
            Username = FirstName.replace(/'/g, '').substring(0, 2).toLowerCase() + EntryYear.toString().substring(2, 4) + LastName.replace(/'/g, '').substring(0, 2).toLowerCase();
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
            Username = FirstName.replace(/'/g, '').substring(0, 2).toLowerCase() + EntryYear.toString().substring(2, 4) + LastName.replace(/'/g, '').substring(0, 2).toLowerCase();
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
        EntryYear = new Date().getFullYear() - 1;
        Username = FirstName.replace(/'/g, '').substring(0, 2).toLowerCase() + EntryYear.toString().substring(2, 4) + LastName.replace(/'/g, '').substring(0, 2).toLowerCase();
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
        ['COMP1121', 'Databases', 'NoDescription', 10, '2'],
        ['COMP1211', 'Computer Architecture', 'NoDescription', 10, '1'],
        ['COMP1212', 'Computer Processors', 'NoDescription', 10, '2'],
        ['COMP1421', 'Fundamental Mathematical Concepts', 'NoDescription', 10, '1'],
        ['COMP1511', 'Introduction to Discrete Mathematics', 'NoDescription', 10, '2'],
        ['COMP1711', 'Procedural Programming', 'NoDescription', 10, '1'],
        ['COMP1721', 'Object Oriented Programming', 'NoDescription', 10, '2'],
        ['COMP1911', 'Professional Computing', 'NoDescription', 20, '1'],
        ['COMP1921', 'Programming Project', 'NoDescription', 10, '2'],
        ['COMP1011', 'Programming for the Web', 'NoDescription', 10, '1'],
        ['COMP1021', 'Introduction to Web Technologies', 'NoDescription', 10, '2'],
        ['COMP2211', 'Operating Systems', 'NoDescription', 10, '1'],
        ['COMP2221', 'Networks', 'NoDescription', 10, 2],
        ['COMP2321', 'Formal Languages and Finite Automata', 'NoDescription', 10, '2'],
        ['COMP2421', 'Numerical Computation', 'NoDescription', 10, '1'],
        ['COMP2611', 'Artificial Intelligence', 'NoDescription', 10, '2'],
        ['COMP2711', 'Algorithms and Data Structures I', 'NoDescription', 10, '1'],
        ['COMP2721', 'Algorithms and Data Structures II', 'NoDescription', 10, '2'],
        ['COMP2811', 'User Interfaces', 'NoDescription', 10, '1'],
        ['COMP2931', 'Software Engineering', 'NoDescription', 10, '1/2'],
        ['COMP2011', 'Web Application Development', 'NoDescription', 10, '1'],
        ['COMP2021', 'Social and Mobile Web Application Development', 'NoDescription', 10, '2'],
        ['COMP3911', 'Secure Computing', 'NoDescription', 10, '1'],
        ['COMP3931', 'Individual Project', 'NoDescription', 40, '1/2'],
        ['COMP3011', 'Web Services and Web Data', 'NoDescription', 10, '2'],
        ['COMP3211', 'Distributed Systems', 'NoDescription', 10, '1'],
        ['COMP3222', 'Mobile Application Development', 'NoDescription', 10, '2'],
        ['COMP3631', 'Intelligent Systems and Robotics', 'NoDescription', 20, '1/2'],
        ['COMP3736', 'Information Visualization', 'NoDescription', 10, '1'],
        ['COMP3223', 'Cryptography', 'NoDescription', 10, '2'],
        ['COMP5530M', 'Group Project', 'NoDescription', 30, '1/2'],
        ['COMP5111M', 'Big Data Systems', 'NoDescription', 15, '2'],
        ['COMP5850M', 'Cloud Computing', 'NoDescription', 15, '2'],
        ['COMP5122M', 'Data Science', 'NoDescription', 15, '1'],
        ['COMP5821M', 'Geometric Processing', 'NoDescription', 15, '2'],
        ['COMP5711M', 'Practical Programming', 'NoDescription', 15, '1'],
        ['COMP5870M', 'Image Analysis', 'NoDescription', 15, '2'],
        ['COMP5200M', 'MSc Project', 'NoDescription', 60, '1 Jan to 30 Sep'],
        ['COMP3611', 'Machine Learning', 'NoDescription', 10, '2'],
        ['COMP3910', 'Combinatorial Optimisation', 'NoDescription', 10, '1']
    ];

    var sql = "INSERT INTO Module (ModuleCode, ModuleName, Description, NumberOfCredits, Semester) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Module Table has been populated!");
    });


    //5. Populating CourseModule table
    var values = [

        //Modules for BSc Computer Science
        ['COMP1121', 1],
        ['COMP1211', 1],
        ['COMP1212', 1],
        ['COMP1421', 1],
        ['COMP1511', 1],
        ['COMP1711', 1],
        ['COMP1721', 1],
        ['COMP1911', 1],
        ['COMP1921', 1],
        ['COMP1011', 1],
        ['COMP1021', 1],

        ['COMP2211', 1],
        ['COMP2221', 1],
        ['COMP2321', 1],
        ['COMP2421', 1],
        ['COMP2611', 1],
        ['COMP2711', 1],
        ['COMP2721', 1],
        ['COMP2811', 1],
        ['COMP2931', 1],
        ['COMP2011', 1],
        ['COMP2021', 1],

        ['COMP3911', 1],
        ['COMP3931', 1],
        ['COMP3011', 1],
        ['COMP3211', 1],
        ['COMP3222', 1],
        ['COMP3631', 1],
        ['COMP3736', 1],
        ['COMP3223', 1],

        //Modules for BSc,MEng Computer Science
        ['COMP1121', 2],
        ['COMP1211', 2],
        ['COMP1212', 2],
        ['COMP1421', 2],
        ['COMP1511', 2],
        ['COMP1711', 2],
        ['COMP1721', 2],
        ['COMP1911', 2],
        ['COMP1921', 2],
        ['COMP1011', 2],
        ['COMP1021', 2],

        ['COMP2211', 2],
        ['COMP2221', 2],
        ['COMP2321', 2],
        ['COMP2421', 2],
        ['COMP2611', 2],
        ['COMP2711', 2],
        ['COMP2721', 2],
        ['COMP2811', 2],
        ['COMP2931', 2],
        ['COMP2011', 2],
        ['COMP2021', 2],

        ['COMP3911', 2],
        ['COMP3931', 2],
        ['COMP3011', 2],
        ['COMP3211', 2],
        ['COMP3222', 2],
        ['COMP3631', 2],
        ['COMP3736', 2],
        ['COMP3223', 2],

        ['COMP5530M', 2],
        ['COMP5111M', 2],
        ['COMP5850M', 2],
        ['COMP5122M', 2],
        ['COMP5821M', 2],
        ['COMP5711M', 2],
        ['COMP5870M', 2],

        // //Modules for MSc Advanced Computer Science (Cloud Computing)
        ['COMP5870M', 3],
        ['COMP5850M', 3],
        ['COMP5111M', 3],
        ['COMP5870M', 3],
        ['COMP3211', 3],
        ['COMP3011', 3],
        ['COMP3911', 3],
        ['COMP5122M', 3],
        ['COMP3736', 3],
        ['COMP3611', 3],
        ['COMP3910', 3]
    ];

    var sql = "INSERT INTO CourseModule (ModuleCode, courseID) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("CourseModule Table has been populated!");
    });

    //6. Populating Teaching and assessing table
    //For simplicity let's assume each AcademicStaff is teaching one and assessing one module
    var valuesTeaching = [];
    var valuesAssessing = [];

    var numberOfStaff;
    con.query("SELECT COUNT(id) FROM AcademicStaff", function(err, result, fields) {
        if (err) throw err;
        numberOfStaff = result[0]['COUNT(id)'];
    });

    var modules = [];
    con.query("SELECT ModuleCode FROM Module", function(err, result, fields) {
        if (err) throw err;
        modules = result;

        counter = 1;
        modules.forEach(function(module) {
            if (counter == numberOfStaff) {
                teacherID = counter;
                assessorID = 1;
            } else {
                teacherID = counter;
                assessorID = counter + 1;
            }
            valuesTeaching.push([teacherID, module["ModuleCode"]]);
            valuesAssessing.push([assessorID, module["ModuleCode"]]);
            counter += 1;
        });

        var sql = "INSERT INTO Teaching (AcademicStaffID, ModuleCode) VALUES ?";
        con.query(sql, [valuesTeaching], function(err, result) {
            if (err) throw err;
            console.log("Teaching table has been populated!");
        });

        var sql = "INSERT INTO Assessing (AcademicStaffID, ModuleCode) VALUES ?";
        con.query(sql, [valuesAssessing], function(err, result) {
            if (err) throw err;
            console.log("Assesing table has been populated!");
        });
    });

    //7. Populating User table with students
    con.query("SELECT Username FROM Student", function(err, result, fields) {
        if (err) throw err;
        students = result;

        students.forEach(function(student) {
            username = student['Username'];
            var sql = "INSERT INTO User (Username, Type, Password) VALUES ('" +
                username + "', 'student' , 'pass')";
            con.query(sql, function(err, result) {
                if (err) throw err;
            });
        });
        console.log("User table has been populated with students!");
    });

    //8. Populating User table with academic staff
    con.query("SELECT Username FROM AcademicStaff", function(err, result, fields) {
        if (err) throw err;
        students = result;

        students.forEach(function(student) {
            username = student['Username'];
            var sql = "INSERT INTO User (Username, Type, Password) VALUES ('" +
                username + "', 'academicstaff' , 'pass')";
            con.query(sql, function(err, result) {
                if (err) throw err;
            });
        });
        console.log("User table has been populated with academicstaff!");
    });

    //9. Populating Enrolment table 

    //Getting all students 
    con.query("SELECT * FROM Student", function(err, result, fields) {
        if (err) throw err;
        students = result;

        //Retrieving information on which student studies/studied which modules
        students.forEach(function(student) {

            //Select modules that belong to the course, which student studies
            con.query("SELECT * FROM CourseModule WHERE CourseID = " + student['CourseID'], function(err, result, fields) {
                if (err) throw err;
                modules = result;

                //Iterate over all modules retrieved
                modules.forEach(function(module) {
                    //If a student has studied the module, add it to enrolment table
                    //Special case when a student is studying extended degree (e.g. BSc,MSc) and 
                    //ModuleCode doesn't correspond to Study Level (e.g. LevelOfStudy=4 but modules taken start with COMP5).
                    if ((Number(module['ModuleCode'].charAt(4)) <= student['Level']) ||
                        (Number(module['ModuleCode'].charAt(4)) == 5 && student['Level'] == 4)) {

                        if (student['Level'] == 5) {
                            yearTaken = student['EntryYear'];
                            levelOfStudy = student['Level'];
                        } else if (student['Level'] == 4 && (Number(module['ModuleCode'].charAt(4)) == 5) ) {
                            yearTaken = student['EntryYear'] + Number(module['ModuleCode'].charAt(4)) - 2;
                            levelOfStudy = student['Level'];
                        } else {
                            yearTaken = student['EntryYear'] + Number(module['ModuleCode'].charAt(4)) - 1;
                            levelOfStudy = Number(module['ModuleCode'].charAt(4));
                        }

                        sql = "INSERT INTO Enrolment(ModuleCode, StudentID, LevelOfStudy, YearTaken, OverallResult) VALUES ('" +
                            module['ModuleCode'] + "'," + student['id'] + ","+ levelOfStudy+","+ yearTaken + ",0)";
                        con.query(sql, function(err, result) {
                            if (err) throw err;
                        });


                    }
                });

            });

        });
        console.log("Enrolment table has been populated!");
    });

    //Finally, generate fake results for modules taken in the past
    // con.query("SELECT * FROM Enrolment", function(err, result, fields) {
    //     if (err) throw err;
    //     enrolments = result;

    //     enrolments.forEach(function(enrolment){
    //         if (enrolment['YearTaken'] != '2017'){
    //             con.query("UPDATE Enrolment SET OverallResult = " + faker.random.number({min: 40,max: 100})+
    //                 " WHERE id="+ enrolment['id'], function(err, result, fields) {
    //                 if (err) throw err;
    //             });
    //         }
    //     });
    // });
        var values = [
        ['2017','1','1','2017-09-25','2017-10-01'],
        ['2017','1','2','2017-10-02','2017-10-08' ],
        ['2017','1','3','2017-10-09','2017-10-15' ],
        ['2017','1','4','2017-10-16','2017-10-22'],
        ['2017','1','5','2017-10-23','2017-10-29'],
        ['2017','1','6','2017-10-30','2017-11-05'],
        ['2017','1','7','2017-11-06','2017-11-12'],
        ['2017','1','8','2017-11-13','2017-11-19'],
        ['2017','1','9','2017-11-20','2017-11-26' ],
        ['2017','1','10','2017-11-27','2017-12-03'],
        ['2017','1','11','2017-12-04','2017-12-10'],

        ['2017','2','1','2018-01-22','2018-01-28'],
        ['2017','2','2','2018-01-29','2018-02-04'],
        ['2017','2','3','2018-02-05','2018-02-11'],
        ['2017','2','4','2018-02-12','2018-02-18'],
        ['2017','2','5','2018-02-19','2018-02-25'],
        ['2017','2','6','2018-02-26','2018-03-04'],
        ['2017','2','7','2018-03-05','2018-03-11'],
        ['2017','2','8','2018-03-12','2018-03-18'],
        ['2017','2','9','2018-04-16','2018-04-22'],
        ['2017','2','10','2018-04-23','2018-04-29'],
        ['2017','2','11','2018-04-30','2018-05-06']
    ];

    var sql = "INSERT INTO SemesterWeek (YearOfStudy, SemesterNumber, WeekNumber, StartDate, EndDate) VALUES ?";
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("SemesterWeek Table has been populated!");
    });
});