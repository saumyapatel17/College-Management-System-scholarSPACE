const db = require('./database');
const mail = require('./mail');
const files = require('./storage');
const bcrypt = require("bcryptjs");
const pages = require('../routes/pages');
const control = require("../src/controllers");

let userAdmin = null;
exports.setUser = (uname) => {
    userAdmin = uname;
}

let event = null;
exports.setEvent = (ename) => {
    event = ename;
}

exports.admin_announcement = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Admin_Pages/announcement', {
                    message: er
                });
            }
            else {
                const { course_code, email, title, description } = req.body;
                const filename = req.file;

                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1;
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                newdate = year + "-" + month + "-" + day;

                if (!course_code) {
                    if (!email) {
                        return res.status(400).render('Admin_Pages/announcement', {
                            message: 'Please enter a course code or a email address',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`Select fname, lname, email from admin where username = ?`, [userAdmin], async (error, results) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        var user_fname = results[0].fname;
                                        var user_lname = results[0].lname;
                                        var user_email = results[0].email;
                                        var from = user_fname + ' ' + user_lname + ':' + user_email;

                                        db.query(`insert into Announcement set ?`, {
                                            email: email,
                                            title: title,
                                            description: description,
                                            created_on: newdate,
                                            created_by: from,
                                            file: filename.filename,
                                            inst_code: inst_code
                                        }, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                if (result.affectedRows == 1) {
                                                    console.log("Inserted successfully in dataset.")
                                                    res.redirect("/admin_announcement");
                                                }
                                                else {
                                                    console.log(err)
                                                }
                                            }
                                        }
                                        );
                                    }
                                });
                            }
                        });
                    }
                }
                else {
                    db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var inst_code = results[0].inst_code;

                            db.query(`Select fname, lname, email from admin where username = ?`, [userAdmin], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var user_fname = results[0].fname;
                                    var user_lname = results[0].lname;
                                    var user_email = results[0].email;
                                    var from = user_fname + ' ' + user_lname + ':' + user_email;

                                    db.query(`insert into Announcement set ?`, {
                                        course_code: course_code,
                                        title: title,
                                        description: description,
                                        created_on: newdate,
                                        created_by: from,
                                        file: filename.filename,
                                        inst_code: inst_code
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Inserted successfully in dataset.")
                                                res.redirect("/admin_announcement");
                                                return;
                                            }
                                            else {
                                                console.log(err)
                                            }
                                        }
                                    }
                                    );
                                }
                            });
                        }
                    });
                }
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_events = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Admin_Pages/events', {
                    message: er
                });
            }
            else {
                const { event_name, description, event_date, event_time, location, committee, student_coordinator, staff_coordinator } = req.body;
                const filename = req.file;
                console.log(filename);

                if (!event_name || !description || !event_date || !event_time || !location || !student_coordinator || !staff_coordinator) {
                    return res.status(400).render('Admin_Pages/events', {
                        message: 'Please fill all the details',
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var inst_code = results[0].inst_code;

                            db.query(`insert into Events set ?`, {
                                event_name: event_name,
                                description: description,
                                date: event_date,
                                time: event_time,
                                location: location,
                                committee: committee,
                                student_coordinator: student_coordinator,
                                staff_coordinator: staff_coordinator,
                                file: filename.filename,
                                inst_code: inst_code
                            }, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (result.affectedRows == 1) {
                                        console.log("Inserted successfully in dataset.")
                                        res.redirect("/admin_events"); 
                                    }
                                    else {
                                        console.log(err)
                                    }
                                }
                            }
                            );
                        }
                    });
                }
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_event_posterUpload = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Admin_Pages/event', {
                    message: er
                });
            }
            else {
                const filename = req.file;
                console.log(filename)

                db.query(`UPDATE events SET ? WHERE event_id = ?`, [{
                    poster: filename.filename
                }, event], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (result.affectedRows == 1) {
                            console.log("Updated successfully in dataset.")
                            res.redirect("/admin_event");
                        }
                        else {
                            console.log(err)
                        }
                    }
                }
                );
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_event_id = async (req, res) => {

    try {
        const { e_id } = req.body;
        pages.setEvent(e_id);
        this.setEvent(e_id);
        res.redirect("/admin_event");
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_event_register = async (req, res) => {

    try {
        const { e_id } = req.body;
        pages.setEvent(e_id);
        res.redirect("/admin_registered");
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_updateStudent = async (req, res) => {

    try {
        const { roll_no, email, contact, credits, gpa, branch } = req.body;

        if (!roll_no || !email || !contact || !credits || !gpa || !branch) {
            return res.status(400).render('Admin_Pages/student', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select enrollment_no from student where enrollment_no = ?`, [roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Admin_Pages/student', {
                            message: "Student doesn't exist",
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`UPDATE student SET ? WHERE enrollment_no = ? and inst_code = ?`, [{
                                    email: email,
                                    contact: contact,
                                    credits: credits,
                                    gpa: gpa,
                                    branch: branch
                                }, roll_no, inst_code], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Updated successfully in dataset.")
                                            res.redirect("/admin_student");
                                            // return;
                                        }
                                        else {
                                            console.log(err)
                                        }
                                    }
                                }
                                );
                            }
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_removeStudent = async (req, res) => {

    try {
        const { name, roll_no, email } = req.body;

        if (!name || !roll_no || !email) {
            return res.status(400).render('Admin_Pages/student', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select enrollment_no from student where enrollment_no = ?`, [roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Admin_Pages/student', {
                            message: "Student doesn't exist",
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`DELETE FROM student WHERE enrollment_no = ? and inst_code = ?`, [roll_no, inst_code], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Deleted successfully from dataset.")
                                            res.redirect("/admin_student");
                                        }
                                        else {
                                            console.log(err)
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_updateTeacher = async (req, res) => {

    try {
        const { email, contact, department } = req.body;

        if (!email || !contact || !department) {
            return res.status(400).render('Admin_Pages/teacher', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select email from teacher where email = ?`, [email], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Admin_Pages/teacher', {
                            message: "Teacher doesn't exist",
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`UPDATE teacher SET ? WHERE email = ? and inst_code = ?`, [{
                                    email: email,
                                    contact: contact,
                                    department: department
                                }, email, inst_code], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Updated successfully in dataset.")
                                            res.redirect("/admin_teacher");
                                            // return;
                                        }
                                        else {
                                            console.log(err)
                                        }
                                    }
                                }
                                );
                            }
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_removeTeacher = async (req, res) => {

    try {
        const { email, department } = req.body;

        if (!email || !department) {
            return res.status(400).render('Admin_Pages/teacher', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select email from teacher where email = ?`, [email], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Admin_Pages/teacher', {
                            message: "Teacher doesn't exist",
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`DELETE FROM teacher WHERE email = ? and inst_code = ?`, [email, inst_code], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Deleted successfully from dataset.")
                                            res.redirect("/admin_teacher");
                                        }
                                        else {
                                            console.log(err)
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_addCourse = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Admin_Pages/course', {
                    message: er
                });
            }
            else {
                const { course_code, course_name, description, credits, department, semester, degree, branch, duration, type } = req.body;
                const filename = req.file;

                console.log(filename)
                if (!course_code || !course_name || !description || !credits || !department || !semester || !degree || !branch || !duration || !type) {
                    return res.status(400).render('Admin_Pages/course', {
                        message: 'Please fill all the details',
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var inst_code = results[0].inst_code;

                            db.query(`Select course_code from course where course_code = ? and inst_code = ?`, [course_code, inst_code], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    if (results.length > 0) {
                                        return res.status(401).render('Admin_Pages/course', {
                                            message: "Course already exists",
                                            messageClass: 'alert-danger'
                                        });
                                    }
                                    else {
                                        db.query(`insert into course set ?`, {
                                            course_code: course_code,
                                            course_name: course_name,
                                            description: description,
                                            credits: credits,
                                            department: department,
                                            semester: semester,
                                            degree: degree,
                                            branch: branch,
                                            duration: duration,
                                            type: type,
                                            file: filename.filename,
                                            inst_code: inst_code
                                        }, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                if (result.affectedRows == 1) {
                                                    console.log("Inserted successfully in dataset.")
                                                    res.redirect("/admin_course");
                                                    return;
                                                }
                                                else {
                                                    console.log(err)
                                                }
                                            }
                                        }
                                        );
                                    }
                                }
                            });
                        }
                    });
                }
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_updateCourse = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Admin_Pages/course', {
                    message: er
                });
            }
            else {
                const { course_code, description, credits, semester, branch } = req.body;
                const filename = req.file;

                if (!course_code || !description || !credits || !semester || !branch) {
                    return res.status(400).render('Admin_Pages/course', {
                        message: 'Please fill all the details',
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var inst_code = results[0].inst_code;

                            db.query(`Select course_code from course where course_code = ? and inst_code = ?`, [course_code, inst_code], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    if (results.length > 0) {
                                        return res.status(401).render('Admin_Pages/course', {
                                            message: "Course already exists",
                                            messageClass: 'alert-danger'
                                        });
                                    }
                                    else {
                                        db.query(`UPDATE course SET ? WHERE course_code = ? and inst_code = ?`, [{
                                            description: description,
                                            credits: credits,
                                            semester: semester,
                                            file: filename.filename,
                                            branch: branch
                                        }, course_code, inst_code], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                if (result.affectedRows == 1) {
                                                    console.log("Updated successfully in dataset.")
                                                    res.redirect("/admin_course");
                                                    return;
                                                }
                                                else {
                                                    console.log(err)
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_removeCourse = async (req, res) => {

    try {
        const { course_code, department } = req.body;

        if (!course_code || !department) {
            return res.status(400).render('Admin_Pages/course', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select course_code from course where course_code = ?`, [course_code], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Admin_Pages/course', {
                            message: "Course doesn't exist",
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`DELETE FROM course WHERE course_code = ? and inst_code = ?`, [course_code, inst_code], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Deleted successfully from dataset.")
                                            res.redirect("/admin_course");
                                            return;
                                        }
                                        else {
                                            console.log(err)
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_subscription = async (req, res) => {

    try {
        const { plan_name, plan_duration, start_date, end_date, amount } = req.body;

        if (!plan_name || !plan_duration || !start_date || !end_date) {
            return res.status(400).render('Admin_Pages/subscription', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select inst_code, email from admin where username = ?`, [userAdmin], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var inst_code = results[0].inst_code;
                    var email = results[0].email;
                    db.query(`insert into plans set ?`, [{
                        plan_name: plan_name,
                        plan_duration: plan_duration,
                        start_date: start_date,
                        end_date: end_date,
                        amount: amount,
                        inst_code: inst_code
                    }, inst_code], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            mail(email, 'Plan updated successfully for scholarSPACE', `<body style="background-color:#F0DFDE;">
        
                                <h1><center style="font-size: 50px; font-family: 'Josefin Sans', sans-serif;
                                font-family: 'PT Sans Caption', sans-serif;">
                                WELCOME TO <h2 style="color:#169179; font-family: 'Josefin Sans', sans-serif;
                                font-family: 'PT Sans Caption', sans-serif;">"scholarSPACE"</h2></center></h1>
                                
                                <hr>
                                
                                <center><img src="https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" ></center>
                                
                                <h2><center style = "font-family:'PT Sans Caption', sans-serif;font-size: 30px;">
                                    Your subscription plan for scholarSPACE is successfully updated. </center></h2>
                                                    
                                                    
                                 <p><center style="font-family: 'Josefin Sans', sans-serif;font-family: 'PT Sans Caption', sans-serif;">
                                    We're delighted that you enjoyed our services, and chose to upgrade your subscription plan.
                                  <br>
                                  The plan details are as folllows.</center></p>
                                                    
                                  <p><center style="font-family: 'Comfortaa', cursive;font-family: 'Josefin Sans', sans-serif;font-family: 'PT Sans Caption', sans-serif;
                                                    font-family: 'Rajdhani', sans-serif;">
                                    <b>Plan Name:</b> ${plan_name}<br>
                                    <b>Plan Duration:</b> ${plan_duration}
                                    <b>Start Date:</b> ${start_date}
                                    <b>End Date:</b> ${end_date}
                                    <b>Billing amount:</b> ${amount}</center></p>
                                                    
                                  <p><center style="font-family: 'Josefin Sans', sans-serif;font-family: 'PT Sans Caption', sans-serif;">
                                 Your feedback helps us to make sure that we're elivering exactly what customers want. Just hit reply and let us know.
                                  <br>
                                  Reply to this email if you have any questions. We're here to help.
                                </center></p>
                                
                                <br>
                                
                                <h3><center><button type="button" style="background-color:#169179; color:#fff; font-family:'PT Sans Caption', sans-serif;font-size: 20px;"><a href = "http://127.0.0.1:5000/login" style=" color:#fff" >LogIn to your account</a></button></center>
                                </h3>
                                
                                <br>
                                
                                <h6><center style="font-family: 'Josefin Sans', sans-serif;
                                font-family: 'PT Sans Caption', sans-serif;
                                font-family: 'Rajdhani', sans-serif;">Made with love by Nitant Gupta, Saumya Patel, Prakhar Saxena for a better college organisation.</center></h6>
                                              
                                </body>            `);
                            if (result.affectedRows == 1) {
                                console.log("Updated successfully in dataset.")
                                res.redirect("/admin_subscription");
                                return;
                            }
                            else {
                                console.log(err)
                            }
                        }
                    }
                    );
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_updateInstInfo = async (req, res) => {

    try {
        const { about, address, zip_code, state, country } = req.body;

        if (!about || !address || !zip_code || !state || !country) {
            return res.status(400).render('Admin_Pages/profile', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select inst_code from admin where username = ?`, [userAdmin], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;
                    db.query(`UPDATE institution SET ? WHERE inst_code = ?`, [{
                        description: about,
                        address: address,
                        zip_code: zip_code,
                        state: state,
                        country: country
                    }, institution_code], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (result.affectedRows == 1) {
                                console.log("Edited successfully in dataset.")
                                res.redirect("/admin_profile");
                            }
                            else {
                                console.log(err)
                            }
                        }
                    }
                    );
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.admin_updatePersonalInfo = async (req, res) => {

    try {
        const { contact, email } = req.body;

        if (!contact || !email) {
            return res.status(400).render('Admin_Pages/profile', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`UPDATE admin SET ? WHERE username = ?`, [{
                contact: contact,
                email: email
            }, userAdmin], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.affectedRows == 1) {
                        console.log("Edited successfully in dataset.")
                        res.redirect("/admin_profile");
                    }
                    else {
                        console.log(err)
                    }
                }
            }
            );
        }
    }
    catch (error) {
        console.log(error);
    }
}



