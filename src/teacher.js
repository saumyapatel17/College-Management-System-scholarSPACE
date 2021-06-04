const db = require('./database');
const mail = require('./mail');
const files = require('./storage');
const bcrypt = require("bcryptjs");
const pages = require('../routes/pages');
const control = require("../src/controllers");


let userTeacher = null;
exports.setUser = (uname) => {
    userTeacher = uname;
}

let group = null;
exports.setGroup = (g_id) => {
    group = g_id;
}


let project = null;
exports.setProject = (p_id) => {
    project = p_id;
}

let event = null;
exports.setEvent = (ename) => {
    event = ename;
}

exports.teacher_announcement = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Teacher_Pages/announcement', {
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
                        return res.status(400).render('Teacher_Pages/announcement', {
                            message: 'Please enter a course code or a email address',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        db.query(`Select inst_code from teacher where username = ?`, [userTeacher], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                var inst_code = results[0].inst_code;

                                db.query(`Select fname, lname, email from teacher where username = ?`, [userTeacher], async (error, results) => {
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
                                                    res.redirect("/teacher_announcement");
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
                        });
                    }
                }
                else {
                    db.query(`Select inst_code from teacher where username = ?`, [userTeacher], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var inst_code = results[0].inst_code;

                            db.query(`Select fname, lname, email from teacher where username = ?`, [userTeacher], async (error, results) => {
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
                                        inst_code: inst_code
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Inserted successfully in dataset.")
                                                res.redirect("/teacher_announcement");
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


exports.teacher_events = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Teacher_Pages/events', {
                    message: er
                });
            }
            else {
                const { event_name, description, event_date, event_time, location, committee, student_coordinator, staff_coordinator } = req.body;
                const poster = req.file;
                const filename = req.file;

                if (!event_name || !description || !event_date || !event_time || !location || !student_coordinator || !staff_coordinator) {
                    return res.status(400).render('Teacher_Pages/events', {
                        message: 'Please fill all the details',
                        messageClass: 'alert-danger'
                    });
                }
                else {
                    db.query(`Select inst_code from teacher where username = ?`, [userTeacher], async (error, results) => {
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
                                        res.redirect("/teacher_events");
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


exports.teacher_event_id = async (req, res) => {

    try {
        const { e_id } = req.body;
        pages.setEvent(e_id);
        this.setEvent(e_id);
        res.redirect("/teacher_event");
    }
    catch (error) {
        console.log(error);
    }
}

exports.teacher_event_posterUpload = async (req, res) => {

    try {
        files.upload(req, res, (er) => {
            if (er) {
                res.render('Teacher_Pages/event', {
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
                            res.redirect("/teacher_event");
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


exports.teacher_event_register = async (req, res) => {

    try {
        const { e_id } = req.body;
        pages.setEvent(e_id);
        res.redirect("/teacher_registered");
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_groups = async (req, res) => {

    try {
        const { group_name, owner_name, course_code, course_name } = req.body;

        if (!group_name || !owner_name || !course_code || !course_name) {
            return res.status(400).render('Teacher_Pages/groups', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select inst_code from teacher where username = ?`, [userTeacher], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var inst_code = results[0].inst_code;

                    db.query(`Select course_code from course where course_code = ? and inst_code = ?`, [course_code, inst_code], async (error, results) => {
                        if (error) {
                            console.log(error);

                        } else if (results.length == 0) {
                            return res.status(401).render('Teacher_Pages/groups', {
                                message: 'This course does not exists',
                                messageClass: 'alert-danger'
                            });
                        }
                        else {
                            var c_code = results[0].course_code;

                            db.query(`Select group_name from course_group where course_code = ? and inst_code = ?`, [c_code, inst_code], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else if (results.length > 0) {
                                    return res.status(401).render('Teacher_Pages/groups', {
                                        message: 'Group name already exists for this course',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    db.query(`insert into course_group set ?`, {
                                        group_name: group_name,
                                        owner_name: owner_name,
                                        course_code: c_code,
                                        inst_code: inst_code
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {

                                                db.query(`Select group_id from course_group where inst_code = ? and group_name = ? and course_code = ?`, [inst_code, group_name, c_code], async (error, results) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        var group_id = results[0].group_id;
                                                        console.log(group_id);
                                                        db.query(`insert into group_teacher set ?`, {
                                                            group_id: group_id,
                                                            teacher_id: userTeacher
                                                        }, (err, resul) => {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                if (resul.affectedRows == 1) {
                                                                    console.log("Inserted successfully in dataset.")
                                                                    res.redirect("/teacher_groups");
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
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_group_id = async (req, res) => {

    try {
        const { g_id } = req.body;
        pages.setGroup(g_id);
        this.setGroup(g_id);
        res.redirect("/teacher_people");
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_addTeacher = async (req, res) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).render('Teacher_Pages/people', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from teacher where email = ?`, [email], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Teacher_Pages/people', {
                            message: 'Teacher does not exists',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        var user_teacher = results[0].username;
                        db.query(`Select * from group_teacher where group_id = ? and teacher_id = ?`, [group, user_teacher], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (results.length > 0) {
                                    return res.status(401).render('Teacher_Pages/people', {
                                        message: 'Teacher Already Exists in this group',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    db.query(`insert into group_teacher set ?`, {
                                        group_id: group,
                                        teacher_id: user_teacher
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Inserted successfully in dataset.")
                                                res.redirect("/teacher_people");
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
                }

            });

        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_removeTeacher = async (req, res) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).render('Teacher_Pages/people', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from teacher where email = ?`, [email], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Teacher_Pages/people', {
                            message: 'Teacher does not exists',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        var user_teacher = results[0].username;

                        db.query(`Select * from group_teacher where group_id = ? and teacher_id = ?`, [group, user_teacher], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (results.length == 0) {
                                    return res.status(401).render('Teacher_Pages/people', {
                                        message: 'Teacher does not exists in this group',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    db.query(`DELETE FROM group_teacher WHERE group_id = ? and teacher_id = ?`, [group, user_teacher], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Deleted successfully from dataset.")
                                                res.redirect("/teacher_people");
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
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_addStudent = async (req, res) => {

    try {
        const { email, roll_no } = req.body;

        if (!email || !roll_no) {
            return res.status(400).render('Teacher_Pages/people', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from student where email = ? and enrollment_no =?`, [email, roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (results.length == 0) {
                        return res.status(401).render('Teacher_Pages/people', {
                            message: 'Student does not exists',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        var user_student = results[0].username;

                        db.query(`Select * from group_student where group_id = ? and student_id = ?`, [group, user_student], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (results.length > 0) {
                                    return res.status(401).render('Teacher_Pages/people', {
                                        message: 'Student Already Exists in this group',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    db.query(`insert into group_student set ?`, {
                                        group_id: group,
                                        student_id: user_student
                                    }, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Inserted successfully in dataset.")
                                                res.redirect("/teacher_people");
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
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_removeStudent = async (req, res) => {

    try {
        const { roll_no } = req.body;

        if (!roll_no) {
            return res.status(400).render('Teacher_Pages/people', {
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
                    if (results.length == 0) {
                        return res.status(401).render('Teacher_Pages/people', {
                            message: 'Student does not exists',
                            messageClass: 'alert-danger'
                        });
                    }
                    else {
                        var user_student = results[0].username;

                        db.query(`Select * from group_student where group_id = ? and student_id = ?`, [group, user_student], async (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (results.length == 0) {
                                    return res.status(401).render('Teacher_Pages/people', {
                                        message: 'Student does not exists in this group',
                                        messageClass: 'alert-danger'
                                    });
                                }
                                else {
                                    db.query(`DELETE FROM group_student WHERE group_id = ? and student_id = ?`, [group, user_student], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            if (result.affectedRows == 1) {
                                                console.log("Deleted successfully from dataset.")
                                                res.redirect("/teacher_people");
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
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_projects = async (req, res) => {

    try {
        const { project_name, description, points, assigned_date, deadline } = req.body;

        if (!project_name || !description || !points || !assigned_date || !deadline) {
            return res.status(400).render('Teacher_Pages/project_list', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select inst_code, fname, lname from teacher where username = ?`, [userTeacher], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var inst_code = results[0].inst_code;
                    var user_fname = results[0].fname;
                    var user_lname = results[0].lname;
                    var name = user_fname + ' ' + user_lname;

                    db.query(`Select project_name from projects where project_name = ? and group_id`, [project_name, group], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results.length > 0) {
                                return res.status(401).render('Teacher_Pages/project_list', {
                                    message: 'Project name Already Exists',
                                    messageClass: 'alert-danger'
                                });
                            }
                            else {
                                db.query(`insert into projects set ?`, {
                                    project_name: project_name,
                                    description: description,
                                    points: points,
                                    assigned_date: assigned_date,
                                    deadline: deadline,
                                    evaluator: name,
                                    group_id: group
                                }, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (result.affectedRows == 1) {
                                            console.log("Inserted successfully in dataset.")
                                            res.redirect("/teacher_project_list");
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


exports.teacher_project_id = async (req, res) => {

    try {
        const { p_id } = req.body;
        pages.setProject(p_id);
        this.setProject(p_id);
        res.redirect("/teacher_project");
    }
    catch (error) {
        console.log(error);
    }
}


exports.teacher_project_grade = async (req, res) => {

    try {
        const { roll_no, marks, feedback } = req.body;

        if (!roll_no || !marks || !feedback) {
            return res.status(400).render('Teacher_Pages/project', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`Select username from student where enrollment_no = ?`, [roll_no], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var userstudent = results[0].username;
                    db.query(`UPDATE evaluation set ? where project_id = ? and student_id = ?`, [{
                        marks: marks,
                        feedback: feedback
                    }, project, userstudent], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (result.affectedRows == 1) {
                                console.log("Inserted successfully in dataset.")
                                res.redirect("/teacher_project");
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


exports.teacher_updatePersonalInfo = async (req, res) => {

    try {
        const { contact, email, department, address, zip_code, state, country } = req.body;

        if (!contact || !email || !department || !address || !zip_code || !state || !country) {
            return res.status(400).render('Teacher_Pages/profile', {
                message: 'Please fill all the details',
                messageClass: 'alert-danger'
            });
        }
        else {
            db.query(`UPDATE teacher SET ? WHERE username = ?`, [{
                contact: contact,
                email: email,
                department: department,
                address: address,
                zip_code: zip_code,
                state: state,
                country: country
            }, userTeacher], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result.affectedRows == 1) {
                        console.log("Edited successfully in dataset.")
                        res.redirect("/teacher_profile");
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






