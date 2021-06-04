const db = require('./database');
const mail = require('./mail');
const files = require('./storage');
const bcrypt = require("bcryptjs");
const pages = require('../routes/pages');
const control = require("../src/controllers");


let userStudent = null;
exports.setUser = (uname) => {
    userStudent = uname;
}

let project = null;
exports.setProject = (p_id) => {
    project = p_id;
}


exports.student_event_id = async (req, res) => {

    try {
        const { e_id } = req.body;
        pages.setEvent(e_id);
        res.redirect("/student_event");
    }
    catch (error) {
        console.log(error);
    }
}


exports.student_event_register = async (req, res) => {

    try {
        const { e_id } = req.body;

        db.query(`Select * from student_event where student_id = ? and event_id = ?`, [userStudent, e_id], async (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                if (results.length > 0) {
                    console.log("1");
                    return res.status(401).render('Student_Pages/event', {
                        message: 'Already registered for this event',
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`insert into student_event set ?`, {
                        event_id: e_id,
                        student_id: userStudent,
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (result.affectedRows == 1) {
                                pages.setEvent(e_id);
                                console.log("Inserted successfully in dataset.")
                                return res.status(401).render('Student_Pages/event', {
                                    message: 'Successfully registered',
                                    messageClass: 'alert-success'
                                });
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
    catch (error) {
        console.log(error);
    }
}


exports.student_group_id = async (req, res) => {

    try {
        const { g_id } = req.body;
        pages.setGroup(g_id);
        res.redirect("/student_people");
    }
    catch (error) {
        console.log(error);
    }
}


exports.student_submit_project = async (req, res) => {
    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Student_Pages/assessment', {
                    message: er
                });
            }
            else {
                const { p_id, project_desc } = req.body;
                const filename = req.file;
                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1;
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                newdate = year + "-" + month + "-" + day;

                db.query(`Select fname, lname, enrollment_no from student where username =?`, [userStudent], async (error, results) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var user_fname = results[0].fname;
                        var user_lname = results[0].lname;
                        var name = user_fname + ' ' + user_lname;
                        var roll_no = results[0].enrollment_no;

                        db.query(`insert into evaluation set ?`, {
                            project_id: p_id,
                            student_id: userStudent,
                            name: name,
                            enrollment_no: roll_no,
                            project_desc: project_desc,
                            file: filename.filename,
                            submission_date: newdate
                        }, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (result.affectedRows == 1) {
                                    console.log("Inserted successfully in dataset.")
                                    res.redirect("/student_assessment");
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
        })
    }
    catch (error) {
        console.log(error);
    }
}


exports.student_project_id = async (req, res) => {

    try {
        const { p_id } = req.body;
        pages.setProject(p_id);
        this.setProject(p_id);
        res.redirect("/student_project");
    }
    catch (error) {
        console.log(error);
    }
}


exports.student_addMember = async (req, res) => {

    try {
        const { roll_no, role, contribution } = req.body;

        if (!roll_no || !role || !contribution) {
            return res.status(400).render('Student_Pages/project', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username, fname, lname from student where enrollment_no =?`, [roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var user_student = results[0].username;
                    var user_fname = results[0].fname;
                    var user_lname = results[0].lname;
                    var name = user_fname + ' ' + user_lname;

                    db.query(`Select * from project_member where project_id = ? and student_id = ?`, [project, user_student], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results.length > 0) {
                                return res.status(401).render('Student_Pages/project', {
                                    message: 'Student Already Exists in this team',
                                    messageClass: 'alert-danger'
                                });
                            }
                            else {
                                db.query(`insert into project_member set ?`, {
                                    project_id: project,
                                    role: role,
                                    contribution: contribution,
                                    name: name,
                                    student_id: user_student
                                }, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Inserted successfully in dataset.")
                                            res.redirect("/student_project");
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
    catch (error) {
        console.log(error);
    }
}


exports.student_removeMember = async (req, res) => {

    try {
        const { roll_no } = req.body;

        if (!roll_no) {
            return res.status(400).render('Student_Pages/project', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from student where enrollment_no =?`, [roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var user_student = results[0].username;

                    db.query(`Select * from project_member where project_id = ? and student_id = ?`, [project, user_student], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results.length == 0) {
                                return res.status(401).render('Student_Pages/project', {
                                    message: 'Student does not exists in this team',
                                    messageClass: 'alert-danger'
                                });
                            }
                            else {
                                db.query(`DELETE FROM project_member WHERE project_id = ? and student_id = ?`, [project, user_student], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Deleted successfully from dataset.")
                                            res.redirect("/student_project");
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
    catch (error) {
        console.log(error);
    }
}


exports.student_updatePersonalInfo = async (req, res) => {

    try {
        const { contact, email, roll_no, credits, gpa, batch, degree, branch, address, zip_code, state, country } = req.body;

        if (!contact || !email || !roll_no || !credits || !gpa || !batch || !degree || !branch || !address || !zip_code || !state || !country) {
            return res.status(400).render('Student_Pages/profile', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`UPDATE student SET ? WHERE username = ?`, [{
                contact: contact,
                email: email,
                enrollment_no: roll_no,
                credits: credits,
                gpa: gpa,
                batch: batch,
                degree: degree,
                branch: branch,
                address: address,
                zip_code: zip_code,
                state: state,
                country: country
            }, userStudent], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.affectedRows == 1) {
                        console.log("Edited successfully in dataset.")
                        res.redirect("/student_profile");
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
