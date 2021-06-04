const express = require("express");
const db = require('../src/database');
const router = express.Router();
const control = require("../src/controllers");
const admin = require("../src/admin");
const teacher = require('../src/teacher');
const student = require('../src/student');
const e = require("express");


let username = null;
exports.setUser = (uname) => {
    username = uname;
}

let event = null;
exports.setEvent = (ename) => {
    event = ename;
}

let group = null;
exports.setGroup = (g_id) => {
    group = g_id;
}

let project = null;
exports.setProject = (p_id) => {
    project = p_id;
}


router.get('/', (req, res) => {
    res.render('index');
})


router.get('/get_started', (req, res) => {
    res.render('Home_pages/get_started');
})


router.get('/login', (req, res) => {
    res.render('Home_pages/logIn');
})


router.get('/signup', (req, res) => {
    res.render('Home_pages/signUp');
})


router.get('/admin_home', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from announcement where inst_code = ?`, [institution_code], function (error, announcement, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select * from student where inst_code = ?`, [institution_code], function (error, student, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            db.query(`Select * from teacher where inst_code = ?`, [institution_code], function (error, teacher, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    db.query(`Select * from course where inst_code = ?`, [institution_code], function (error, course, fields) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            db.query(`Select * from plans where inst_code = ? ORDER BY "plan_id" DESC LIMIT 1`, [institution_code], async (error, results) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                }
                                                                else {
                                                                    res.render('Admin_Pages/home', { title: 'Admin Home', Data: data, Events: events_data, announcement: announcement, student: student.length, teacher: teacher.length, course: course.length, plan: results });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_announcement', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from announcement where inst_code = ?`, [institution_code], function (error, announcement, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/announcement', { title: 'Admin Announcement', Data: data, announcement: announcement });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_calendar', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.render('Admin_Pages/calendar', { title: 'Admin calendar', Data: data });
        }
    });

})


router.get('/admin_course', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from course where inst_code = ?`, [institution_code], function (error, course_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/course', { title: 'Admin course', Data: data, Course: course_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_event', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from events where event_id = ?`, [event], function (error, event_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.render('Admin_Pages/event', { title: 'Admin event', Data: data, Events: event_data });
                }
            });
        }
    });

})


router.get('/admin_events', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/events', { title: 'Admin events', Data: data, Events: events_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_profile', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from institution where inst_code = ?`, [institution_code], function (error, inst_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    res.render('Admin_Pages/profile', { title: 'Admin Profile', Data: data, Institution: inst_data, Events: events_data });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
})


router.get('/admin_project', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.render('Admin_Pages/project', { title: 'Admin project', Data: data });
        }
    });

})


router.get('/admin_registered', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`select * from student where username IN (select student_id from student_event where event_id =?)`, [event], function (error, registered, results) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from events where event_id = ?`, [event], function (error, event_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/registered', { title: 'Admin registered', Data: data, registered: registered, events: event_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_student_group', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.render('Admin_Pages/student_group', { title: 'Admin student group', Data: data });
        }
    });

})


router.get('/admin_student', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from student where inst_code = ?`, [institution_code], function (error, stud_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/student', { title: 'Admin student', Data: data, Student: stud_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_subscription', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from plans where inst_code = ? ORDER BY "plan_id" ASC LIMIT 1`, [institution_code], function (error, Plans, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from plans where inst_code = ? ORDER BY "plan_id" DESC`, [institution_code], function (error, log, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    res.render('Admin_Pages/subscription', { title: 'Admin subscription', Data: data, Plans: Plans, log: log });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/admin_teacher', (req, res) => {

    db.query(`Select * from Admin where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Admin where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from teacher where inst_code = ?`, [institution_code], function (error, teacher_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Admin_Pages/teacher', { title: 'Admin teacher', Data: data, Teacher: teacher_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_home', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from announcement where inst_code = ?`, [institution_code], function (error, announcement, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select * from course_group where inst_code = ? and group_id IN (select group_id from group_teacher where teacher_id = ?)`, [institution_code, username], function (error, group, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            db.query(`Select * from projects where group_id IN (select group_id from group_teacher where teacher_id = ?)`, [username], function (error, project, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    db.query(`Select * from evaluation where project_id IN (select project_id from projects where group_id IN (select group_id from group_teacher where teacher_id = ?))`, [username], function (error, submission, fields) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            res.render('Teacher_Pages/home', { title: 'Teacher home', Data: data, Events: events_data, announcement: announcement, group: group.length, project: project.length, submission: submission.length });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_announcement', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from announcement where inst_code = ?`, [institution_code], function (error, announcement, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/announcement', { title: 'Teacher announcement', Data: data, announcement: announcement });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_calendar', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.render('Teacher_Pages/calendar', { title: 'Teacher calendar', Data: data });
        }
    });

})


router.get('/teacher_evaluation', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from course_group where group_id = ?`, [group], function (error, group_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.render('Teacher_Pages/evaluation', { title: 'Teacher evaluation', Data: data, Group: group_data });
                }
            });
        }
    });

})


router.get('/teacher_event', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from events where event_id = ?`, [event], function (error, event_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.render('Teacher_Pages/event', { title: 'Teacher event', Data: data, Events: event_data });
                }
            });
        }
    });

})


router.get('/teacher_events', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/events', { title: 'Teacher events', Data: data, Events: events_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_groups', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from course_group where inst_code = ? and group_id IN (select group_id from group_teacher where teacher_id = ?)`, [institution_code, username], function (error, group_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/groups', { title: 'Teacher groups', Data: data, Group: group_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_people', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from course_group where group_id = ?`, [group], function (error, group_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`select * from teacher where username IN (select teacher_id from group_teacher where group_id =?)`, [group], function (error, teacher, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`select * from student where username IN (select student_id from group_student where group_id =?)`, [group], function (error, student, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`select * from course where course_code = (select course_code from course_group where group_id =?)`, [group], function (error, course, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {

                                            res.render('Teacher_Pages/people', { title: 'Teacher people', Data: data, Group: group_data, Teacher: teacher, Student: student, course: course });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_profile', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/profile', { title: 'Teacher profile', Data: data, Events: events_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_project_list', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from projects where group_id = ?`, [group], function (error, project_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from course_group where group_id = ?`, [group], function (error, group_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/project_list', { title: 'Teacher project_list', Data: data, Project: project_data, Group: group_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_project', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from evaluation where project_id = ? and marks IS NULL and feedback IS NULL`, [project], function (error, project_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from evaluation where project_id = ? and marks IS NOT NULL`, [project], function (error, evaluate_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from projects where project_id = ?`, [project], function (error, p_name, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    res.render('Teacher_Pages/project', { title: 'Teacher project', Data: data, Project: project_data, Evaluated: evaluate_data, p_name: p_name });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_registered', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`select * from student where username IN (select student_id from student_event where event_id =?)`, [event], function (error, registered, results) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from events where event_id = ?`, [event], function (error, event_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/registered', { title: 'Teacher registered', Data: data, registered: registered, events: event_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/teacher_student', (req, res) => {

    db.query(`Select * from Teacher where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Teacher where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from student where inst_code = ?`, [institution_code], function (error, stud_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.render('Teacher_Pages/student', { title: 'Teacher student', Data: data, Student: stud_data });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_home', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var email = results[0].email;

                            db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select * from projects where project_id NOT IN (select project_id from evaluation where student_id= ?)`, [username], function (error, project_data, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            db.query(`Select * from course_group where inst_code = ? and group_id IN (select group_id from group_student where student_id = ?)`, [institution_code, username], function (error, group, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    db.query(`Select * from evaluation where student_id = ?`, [username], function (error, submission, fields) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            res.render('Student_Pages/home', { title: 'Student home', Data: data, announcement: announcement, Project: project_data, group: group.length, submission: submission.length, pending: project_data.length });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_assessment', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from course_group where group_id = ?`, [group], function (error, group_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from projects where project_id NOT IN (select project_id from evaluation where student_id= ?) and group_id = ?`, [username, group], function (error, project_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from projects where project_id IN (select project_id from evaluation where student_id= ?) and group_id = ?`, [username, group], function (error, p_data, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            var institution_code = results[0].inst_code;

                                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    var email = results[0].email;

                                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            res.render('Student_Pages/assessment', { title: 'Student assessment', Data: data, Group: group_data, Project: project_data, P_data: p_data, announcement: announcement });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
            });
        }
    });

})


router.get('/student_calendar', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var email = results[0].email;

                            db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    res.render('Student_Pages/calendar', { title: 'Student calendar', Data: data, announcement: announcement });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_event', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from events where event_id = ?`, [event], function (error, event_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var institution_code = results[0].inst_code;

                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var email = results[0].email;

                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            res.render('Student_Pages/event', { title: 'Student event', Data: data, Events: event_data, announcement: announcement });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_events', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from events where inst_code = ?`, [institution_code], function (error, events_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var institution_code = results[0].inst_code;

                                    db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            var email = results[0].email;

                                            db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    res.render('Student_Pages/events', { title: 'Student events', Data: data, Events: events_data, announcement: announcement });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_groups', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var institution_code = results[0].inst_code;

                    db.query(`Select * from course_group where inst_code = ? and group_id IN (select group_id from group_student where student_id =?)`, [institution_code, username], function (error, group_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var institution_code = results[0].inst_code;

                                    db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            var email = results[0].email;

                                            db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    res.render('Student_Pages/groups', { title: 'Student groups', Data: data, Group: group_data, announcement: announcement });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_people', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from course_group where group_id = ?`, [group], function (error, group_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`select * from teacher where username IN (select teacher_id from group_teacher where group_id =?)`, [group], function (error, teacher, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`select * from student where username IN (select student_id from group_student where group_id =?)`, [group], function (error, student, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            var institution_code = results[0].inst_code;

                                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    var email = results[0].email;

                                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            db.query(`select * from course where course_code = (select course_code from course_group where group_id =?)`, [group], function (error, course, fields) {
                                                                if (error) {
                                                                    console.log(error);
                                                                }
                                                                else {

                                                                    res.render('Student_Pages/people', { title: 'Student people', Data: data, Group: group_data, Teacher: teacher, Student: student, announcement: announcement, course: course });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_profile', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from Projects where group_id  IN (select group_id from group_student where student_id = ?)`, [username], function (error, Project, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var institution_code = results[0].inst_code;

                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var email = results[0].email;

                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            res.render('Student_Pages/profile', { title: 'Student profile', Data: data, Project: Project, announcement: announcement });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_project', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from projects where project_id = ?`, [project], function (error, project_data, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select * from project_member where project_id = ?`, [project], function (error, member_data, fields) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            db.query(`Select * from evaluation where project_id = ?`, [project], function (error, evaluation_data, fields) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    db.query(`Select group_id from projects where project_id = ?`, [project], async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            var g_id = results[0].group_id;

                                            db.query(`Select * from course_group where group_id = ?`, [g_id], function (error, group_data, fields) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            var institution_code = results[0].inst_code;

                                                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                }
                                                                else {
                                                                    var email = results[0].email;

                                                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                                                        if (error) {
                                                                            console.log(error);
                                                                        }
                                                                        else {
                                                                            res.render('Student_Pages/project', { title: 'Student project', Data: data, Project: project_data, Member: member_data, Evaluation: evaluation_data, Group: group_data, announcement: announcement });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_registered', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`select * from events where event_id IN (select event_id from student_event where student_id =?)`, [username], function (error, registered, results) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var institution_code = results[0].inst_code;

                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var email = results[0].email;

                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            res.render('Student_Pages/registered', { title: 'Student registered', Data: data, registered: registered, announcement: announcement });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


router.get('/student_workspace', (req, res) => {

    db.query(`Select * from Student where username = ?`, [username], function (error, data, fields) {
        if (error) {
            console.log(error);
        }
        else {
            db.query(`Select * from Projects where group_id  IN (select group_id from group_student where student_id = ?)`, [username], function (error, Project, fields) {
                if (error) {
                    console.log(error);
                }
                else {
                    db.query(`Select inst_code from Student where username = ?`, [username], async (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            var institution_code = results[0].inst_code;

                            db.query(`Select email from Student where username = ?`, [username], async (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    var email = results[0].email;

                                    db.query(`Select * from announcement where inst_code = ? and (email = ? or course_code IN (Select course_code from course where course_code IN (select course_code from course_group where group_id IN (select group_id from group_student where student_id = ?))))`, [institution_code, email, username], function (error, announcement, fields) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            res.render('Student_Pages/workspace', { title: 'Student workspace', Data: data, Project: Project, announcement: announcement });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

})


module.exports = router;